export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateConsumerRelativePath(value, context) {
  const errors = [];
  if (!isNonEmptyString(value)) {
    errors.push(`${context} must be a non-empty string`);
    return errors;
  }

  const normalized = value.trim().replaceAll("\\", "/");
  const segments = normalized.split("/").filter(Boolean);
  if (normalized.startsWith("/") || /^[A-Za-z]:\//.test(normalized)) {
    errors.push(`${context} must be consumer-relative, not absolute`);
  }
  if (segments.includes("..")) {
    errors.push(`${context} must not traverse outside the consumer root`);
  }

  return errors;
}

export function validateReadinessConfig(parsed) {
  const errors = [];
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    errors.push("Config root must be an object");
    return errors;
  }

  for (const key of ["reportLabel", "vendor", "pageKitConfig"]) {
    if (parsed[key] === undefined) continue;
    if (!isNonEmptyString(parsed[key])) {
      errors.push(`${key} must be a non-empty string when present`);
    }
  }

  for (const key of ["vendor", "pageKitConfig"]) {
    if (parsed[key] !== undefined) {
      errors.push(...validateConsumerRelativePath(parsed[key], key));
    }
  }

  if (parsed.commands !== undefined) {
    const validCommands =
      typeof parsed.commands === "string" ||
      (Array.isArray(parsed.commands) && parsed.commands.every((item) => isNonEmptyString(item)));
    if (!validCommands) errors.push("commands must be a comma-separated string or an array of non-empty strings");
  }

  return errors;
}

export function validatePackageRequirement(requirement, context) {
  const errors = [];
  if (!requirement || typeof requirement !== "object") {
    errors.push(`${context} must be an object`);
    return errors;
  }
  if (!isNonEmptyString(requirement.name)) errors.push(`${context}.name must be a non-empty component name`);
  if (!isNonEmptyString(requirement.package)) errors.push(`${context}.package must be a non-empty package name`);
  return errors;
}

export function validateLocalRequirement(requirement, context) {
  const errors = [];
  if (!requirement || typeof requirement !== "object") {
    errors.push(`${context} must be an object`);
    return errors;
  }
  if (!isNonEmptyString(requirement.name)) errors.push(`${context}.name must be a non-empty string`);
  if (!isNonEmptyString(requirement.importFrom)) errors.push(`${context}.importFrom must be a non-empty import path`);
  if (requirement.componentContractId !== undefined && !isNonEmptyString(requirement.componentContractId)) {
    errors.push(`${context}.componentContractId must be a non-empty string when present`);
  }
  if (requirement.componentContractComponent !== undefined && !isNonEmptyString(requirement.componentContractComponent)) {
    errors.push(`${context}.componentContractComponent must be a non-empty string when present`);
  }
  return errors;
}

export function validatePageKitConfig(config) {
  const errors = [];

  if (!config || typeof config !== "object" || Array.isArray(config)) {
    return { pass: false, errors: ["Config root must be an object"] };
  }

  if (!Array.isArray(config.surfaces)) {
    errors.push("surfaces must be an array");
  } else {
    const seenSurfaceIds = new Set();
    config.surfaces.forEach((surface, surfaceIndex) => {
      const context = `surfaces[${surfaceIndex}]`;
      if (!surface || typeof surface !== "object" || Array.isArray(surface)) {
        errors.push(`${context} must be an object`);
        return;
      }
      if (!isNonEmptyString(surface.id)) errors.push(`${context}.id must be a non-empty string`);
      else if (seenSurfaceIds.has(surface.id)) errors.push(`${context}.id duplicates '${surface.id}'`);
      else seenSurfaceIds.add(surface.id);

      errors.push(...validateConsumerRelativePath(surface.file, `${context}.file`));
      if (!Array.isArray(surface.required)) {
        errors.push(`${context}.required must be an array`);
      } else if (surface.required.length === 0) {
        errors.push(`${context}.required must include at least one official component`);
      } else {
        surface.required.forEach((requirement, requirementIndex) => {
          errors.push(...validatePackageRequirement(requirement, `${context}.required[${requirementIndex}]`));
        });
      }
      if (surface.forbiddenFragments !== undefined) {
        if (!Array.isArray(surface.forbiddenFragments)) {
          errors.push(`${context}.forbiddenFragments must be an array when present`);
        } else {
          surface.forbiddenFragments.forEach((fragment, fragmentIndex) => {
            if (!isNonEmptyString(fragment)) {
              errors.push(`${context}.forbiddenFragments[${fragmentIndex}] must be a non-empty string`);
            }
          });
        }
      }
      if (surface.forbiddenTextPatterns !== undefined) {
        if (!Array.isArray(surface.forbiddenTextPatterns)) {
          errors.push(`${context}.forbiddenTextPatterns must be an array when present`);
        } else {
          surface.forbiddenTextPatterns.forEach((pattern, patternIndex) => {
            if (!isNonEmptyString(pattern)) {
              errors.push(`${context}.forbiddenTextPatterns[${patternIndex}] must be a non-empty string`);
              return;
            }
            try {
              new RegExp(pattern);
            } catch (error) {
              errors.push(`${context}.forbiddenTextPatterns[${patternIndex}] must be a valid regular expression: ${error.message}`);
            }
          });
        }
      }
    });
  }

  if (!Array.isArray(config.routes)) {
    errors.push("routes must be an array");
  } else {
    const seenRoutes = new Set();
    config.routes.forEach((route, routeIndex) => {
      const context = `routes[${routeIndex}]`;
      if (!route || typeof route !== "object" || Array.isArray(route)) {
        errors.push(`${context} must be an object`);
        return;
      }
      if (!isNonEmptyString(route.route)) errors.push(`${context}.route must be a non-empty string`);
      else if (seenRoutes.has(route.route)) errors.push(`${context}.route duplicates '${route.route}'`);
      else seenRoutes.add(route.route);

      errors.push(...validateConsumerRelativePath(route.file, `${context}.file`));
      const packageRequirements = route.required ?? route.requiredPackageComponents ?? [];
      const localRequirements = route.requiredLocalComponents ?? [];

      if (!Array.isArray(packageRequirements)) {
        errors.push(`${context}.required must be an array when present`);
      } else {
        packageRequirements.forEach((requirement, requirementIndex) => {
          errors.push(...validatePackageRequirement(requirement, `${context}.required[${requirementIndex}]`));
        });
      }

      if (!Array.isArray(localRequirements)) {
        errors.push(`${context}.requiredLocalComponents must be an array when present`);
      } else {
        localRequirements.forEach((requirement, requirementIndex) => {
          errors.push(...validateLocalRequirement(requirement, `${context}.requiredLocalComponents[${requirementIndex}]`));
        });
      }

      if (Array.isArray(packageRequirements) && Array.isArray(localRequirements) && packageRequirements.length + localRequirements.length === 0) {
        errors.push(`${context} must require at least one package or local component`);
      }
    });
  }

  if (config.componentContracts !== undefined) {
    if (!Array.isArray(config.componentContracts)) {
      errors.push("componentContracts must be an array when present");
    } else {
      const seenContracts = new Set();
      config.componentContracts.forEach((contract, contractIndex) => {
        const context = `componentContracts[${contractIndex}]`;
        if (!contract || typeof contract !== "object" || Array.isArray(contract)) {
          errors.push(`${context} must be an object`);
          return;
        }
        if (!isNonEmptyString(contract.id)) errors.push(`${context}.id must be a non-empty string`);
        else if (seenContracts.has(contract.id)) errors.push(`${context}.id duplicates '${contract.id}'`);
        else seenContracts.add(contract.id);
        errors.push(...validateConsumerRelativePath(contract.file, `${context}.file`));
        if (!isNonEmptyString(contract.component)) errors.push(`${context}.component must be a non-empty component name`);
        if (!Array.isArray(contract.required)) {
          errors.push(`${context}.required must be an array`);
        } else if (contract.required.length === 0) {
          errors.push(`${context}.required must include at least one official component`);
        } else {
          contract.required.forEach((requirement, requirementIndex) => {
            errors.push(...validatePackageRequirement(requirement, `${context}.required[${requirementIndex}]`));
          });
        }
      });
    }
  }

  if (config.routeCoverage !== undefined) {
    const coverage = config.routeCoverage;
    if (!coverage || typeof coverage !== "object" || Array.isArray(coverage)) {
      errors.push("routeCoverage must be an object when present");
    } else {
      errors.push(...validateConsumerRelativePath(coverage.root, "routeCoverage.root"));
      if (!isNonEmptyString(coverage.baseRoute)) errors.push("routeCoverage.baseRoute must be a non-empty string");
    }
  }

  return { pass: errors.length === 0, errors };
}
