# Performance Strategy

**Status**: in progress under approved task range; final performance certification remains pending
**Primary requirements**: FR-036 through FR-040
**Decision principle**: measure comparable production-like scenarios before optimizing or claiming impact

## Current Performance Conclusion

There is no sufficient runtime evidence to name a measured bottleneck or claim that the current design has zero performance impact.

Current source-shape diagnostics are:

| Source | Raw bytes | Gzip bytes (level 9, diagnostic only) |
| --- | ---: | ---: |
| `packages/ui/src/styles.css` | 166,836 | 18,910 |
| `packages/crm/src/styles.css` | 1,214,942 | 114,230 |

The large CRM source and stylesheet justify measurement and modular delivery work, but source gzip is not a package, browser, tree-shaking, or runtime benchmark. No versioned certified baseline currently covers tarball/unpacked size, minified entry chunks, CSS delivery by entry point, tree-shaking, React commits, memory, or controlled browser interaction.

## Measurement Rules

- Compare the same scenario, dataset, production build, browser, runner class, throttling configuration, and tool version.
- Record commit SHA, source-tree/config/input hashes, package versions, artifact hashes, environment, warmup, samples, and raw measurements.
- Use at least five measured runs after warmup; size metrics are exact, timing metrics report median and p95.
- A dirty tree, stale build, different artifact, or changed scenario invalidates comparison.
- Check mode reads baselines and writes only ephemeral CI output; accepting a new baseline is an explicit reviewed action.
- A faster local run is diagnostic, not release evidence.
- Memoization, virtualization, caching, and code splitting require a measured problem and a before/after result; they are not default style rules.

## Metric Families

| Family | Metrics | Representative evidence |
| --- | --- | --- |
| Package delivery | tarball bytes, unpacked bytes, file count, minified/gzip JS per entry, CSS per entry | freshly packed artifacts and manifest |
| Tree shaking | baseline consumer chunk vs one-primitive and one-CRM-component consumer chunks | production synthetic-consumer builds |
| Build/docs | package build duration, static Storybook duration/size | pinned-runner CI samples |
| React render | initial and update commit duration, render count, wasted rerenders | React Profiler harness with stable fixtures |
| Browser interaction | click/input/filter/open-to-settled latency, long tasks | Playwright/browser trace on production build |
| Memory | retained heap after repeated mount/unmount/open/close cycles | browser heap/GC harness |
| Layout | CLS, overflow count, layout shifts during interaction | browser performance and responsive scan |
| Consumer web vitals | LCP, INP, CLS on the synthetic reference page | controlled browser profile; supporting library evidence |

## Reference Scenarios

At minimum, P8 establishes versioned fixtures for:

1. one primitive import and render;
2. representative form with validation and disabled/loading/error states;
3. table with 200 rows, filter, selection, and pagination update;
4. kanban with 100 cards and one state update;
5. shell plus dashboard/page-kit render at desktop and mobile widths;
6. drawer/modal repeated open-close with focus lifecycle;
7. root stylesheet versus supported subpath stylesheet delivery;
8. repeated mount/unmount to detect retained listeners/nodes;
9. Storybook static build and synthetic-consumer production build.

Fixtures use prepared repository data and no network/backend dependency.

## Budget Contract

### Artifact budgets

The first clean P8 run records exact per-package/per-entry values. Thereafter:

- no unapproved change may increase tarball, unpacked, minified/gzip entry JS, or CSS size beyond measurement tolerance;
- a size regression is blocking only when it exceeds both 2% and 2 KiB against a compatible baseline; smaller changes remain recorded for trend analysis;
- an intentional feature-size allocation is declared in the change profile before implementation, linked to user value, and becomes a reviewed budget entry rather than an implicit baseline increase;
- removing size debt shrinks the baseline; the removed bytes cannot return without a new approved allocation;
- root and subpath entry points have separate budgets so a small consumer cannot hide behind a whole-package total;
- unexpected files or duplicated dependencies fail independently of aggregate size.

### Runtime budgets

P8 must record the median, p95, variance, and sample distribution on the pinned reference runner before assigning the numeric `maximum` required by the performance-budget schema. Until that reviewed baseline and maximum exist, `G-PERF` is `blocked`, never pass.

| Scenario | Required P8 budget record | Regression ceiling after calibration |
| --- | --- | ---: |
| Primitive/form React update | median, p95, samples, numeric maximum | no more than 5% over baseline |
| 200-row table filter/update | median, p95, samples, numeric maximum | no more than 5% over baseline |
| 100-card kanban update | median, p95, samples, numeric maximum | no more than 5% over baseline |
| Representative page-kit initial React commit | median, p95, samples, numeric maximum | no more than 5% over baseline |
| Repeated overlay cycle retained heap | retained-heap series across 20 cycles and numeric maximum | no monotonic growth and no more than 5% over baseline |
| Long main-thread tasks during reference interaction | task count/duration distribution and numeric maximum | no regression beyond the approved maximum |

A stable runtime regression fails when it exceeds 5% against the compatible baseline. The P8 numeric maximum is an independent ceiling and always fails when exceeded. Changing that maximum requires an explicit reviewed policy decision; a failing run cannot update it automatically.

### Synthetic consumer web-vital guards

Under the fixed release browser/mobile configuration, the reference consumer targets LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1. These do not certify the future application's Core Web Vitals; they detect library-induced regressions in a controlled host.

## CSS Performance Direction

- Preserve root CSS compatibility while assigning every selector to a package/family owner.
- Measure cascade/order equivalence before and after splitting.
- Offer subpath CSS only when package exports, documentation, ordering, and clean-consumer tests are complete.
- Track selector count, duplicate declarations, unused bytes in representative consumers, and root/subpath compressed size.
- Do not remove a selector from static heuristics alone; prove it is unreachable across public states and browser evidence.
- Design tokens remain CSS variables; reducing bytes cannot justify literal-value drift or token bypass.

## React Performance Direction

- Keep render pure and state minimal before adding performance abstractions.
- Use stable identifiers for collections and stable prepared data in measurement fixtures.
- Profile rerender causes at component boundaries; split ownership/state before broad memoization.
- Add `memo`, `useMemo`, or `useCallback` only when the profiler shows avoided work exceeds complexity and retention cost.
- Virtualize only measured large-collection scenarios and preserve keyboard, focus, screen-reader, and visual contracts.
- Clean up observers, timers, listeners, and portals in lifecycle tests.
- T171 may modify only measured owners under `packages/ui/src/**` or `packages/crm/src/**`. Each candidate records its source paths and decision in `artifacts/performance/optimization-ledger.json`, with comparable raw evidence in `artifacts/performance/before/*.json` and `artifacts/performance/after/*.json`; an unmeasured broad optimization is rejected.

## Execution Stages

| Stage | `G-PERF` scope |
| --- | --- |
| PR | exact artifact sizes for changed packages; affected reference scenarios; compare with approved allocation/baseline |
| Nightly | all reference scenarios, browser traces, memory cycles, static Storybook/build metrics |
| Release | clean production artifacts, full pinned-runner suite, synthetic web-vital guards, zero unapproved budget regression |

Timing regressions are confirmed by a second controlled run, but the original failure is not silently converted to pass. Environment instability is reported as `blocked/error`, never as a successful performance decision.

## Exit Criteria

Performance hardening is complete only when every package/entry has a versioned artifact budget, every reference scenario has current raw and summarized evidence, regressions block the relevant gate, CSS subpath claims are consumer-tested, React optimizations cite measurements, and the release candidate stays within both absolute ceilings and its approved no-growth/allocation policy.
