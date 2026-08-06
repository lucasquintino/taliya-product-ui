import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "specs/005-joint-product-certification");
const sourceArg = process.argv.find((argument) => argument.startsWith("--source-root="));

if (!sourceArg) {
  throw new Error("Pass --source-root=/absolute/path/to/agentes-landing-system.");
}

const sourceRoot = path.resolve(sourceArg.slice("--source-root=".length));
const sourceFile = path.join(
  sourceRoot,
  "specs/006-crm-operational-core/final-screen-contract-matrix.pt-BR.md",
);
const coverageFile = path.join(
  root,
  "specs/001-product-ui-foundation/full-image-page-coverage-audit.json",
);

function stripCode(value) {
  return value.replaceAll("`", "").trim();
}

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseContractRows(markdown) {
  const section = markdown
    .split("## Contrato por superficie propria")[1]
    ?.split("## Superficies contextuais")[0];

  if (!section) throw new Error("Canonical surface contract table was not found.");

  return section
    .split(/\r?\n/)
    .filter(
      (line) =>
        line.startsWith("|") &&
        !line.includes("---") &&
        !line.includes("Superficie |"),
    )
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
    .filter((cells) => cells.length === 6)
    .map(([surface, route, requiredBlocks, essentialActions, essentialStates, note]) => ({
      id: slug(surface),
      surface,
      route: stripCode(route),
      requiredBlocks,
      essentialActions,
      essentialStates,
      note,
      contractKind: "canonical-product-surface",
    }));
}

const structuralFamilies = {
  "Conta basica": ["Access / Subscription shell"],
  "Escolha de plano/checkout Taliya": ["Access / Subscription shell"],
  "Onboarding/setup": ["Setup wizard / Onboarding shell", "Config / Form with right assistant rail"],
  Hoje: ["Dashboard / Card grid"],
  "Inbox/conversas": ["Three-pane conversation workspace"],
  Alunos: ["Worklist / Table + quick filters + drawer"],
  "Perfil do aluno": ["Profile / Detail workspace"],
  Agenda: ["Calendar / Schedule workspace"],
  Grade: ["Calendar / Schedule workspace"],
  Turmas: ["Worklist / Table + quick filters + drawer"],
  "Aula/Chamada": ["Calendar / Schedule workspace", "Profile / Detail workspace"],
  Reposicoes: ["Worklist / Table + quick filters + drawer"],
  "Vendas/Pipeline": ["Kanban workspace"],
  Interessados: ["Worklist / Table + quick filters + drawer"],
  "Aulas experimentais": ["Worklist / Table + quick filters + drawer"],
  Matriculas: ["Worklist / Table + quick filters + drawer"],
  Financeiro: ["Dashboard / Card grid"],
  "Financeiro Kanban": ["Kanban workspace"],
  "Movimentacoes financeiras": ["Worklist / Table + quick filters + drawer"],
  Retencao: ["Worklist / Table + quick filters + drawer"],
  Cancelamentos: ["Worklist / Table + quick filters + drawer"],
  Reativacoes: ["Worklist / Table + quick filters + drawer"],
  Reclamacoes: ["Worklist / Table + quick filters + drawer"],
  "Operacao/Jornadas": ["Kanban workspace"],
  Tarefas: ["Worklist / Table + quick filters + drawer"],
  Checklists: ["Worklist / Table + quick filters + drawer"],
  Aprovacoes: ["Worklist / Table + quick filters + drawer"],
  Agentes: ["Card catalog / Hub grid", "Flow / Automation editor"],
  Fluxos: ["Flow / Automation editor"],
  Simulacoes: ["Flow / Automation editor"],
  "Publicacao de rotina": ["Flow / Automation editor"],
  "Execucao de fluxo": ["Flow / Automation editor"],
  "Uso e cotas": ["Dashboard / Card grid"],
  "Extrato de uso": ["Ledger table / right assistant rail"],
  Relatorios: ["Dashboard / Card grid"],
  "Dinheiro na Mesa": ["Dashboard / Card grid"],
  Configuracoes: ["Card catalog / Hub grid"],
  "Config. permissoes": ["Config / Form with right assistant rail"],
  "Config. pagamentos/financeiro": ["Config / Form with right assistant rail"],
  "Config. agenda": ["Config / Form with right assistant rail", "Calendar / Schedule workspace"],
  "Config. notificacoes/canais": ["Config / Form with right assistant rail"],
  "Suporte Taliya": ["Dashboard / Card grid"],
  "Billing Taliya": ["Dashboard / Card grid"],
  "Faturas Taliya": ["Ledger table / right assistant rail"],
  "Add-ons Taliya": ["Card catalog / Hub grid"],
  "Internal operacao": ["Dashboard / Card grid"],
  "Internal tenants": ["Worklist / Table + quick filters + drawer"],
  "Internal tenant detalhe": ["Profile / Detail workspace"],
  "Access shell": ["Access / Subscription shell"],
  "Empty app shell": ["App shell baseline"],
};

const imageSurfaceAssignments = new Map();
function assign(keys, surface) {
  for (const key of keys) imageSurfaceAssignments.set(key, surface);
}

assign(["17", "18", "19", "20"], "Hoje");
assign(["21", "22"], "Operacao/Jornadas");
assign(["23"], "Tarefas");
assign(["24C"], "Checklists");
assign(["24D"], "Inbox/conversas");
assign(["25"], "Aprovacoes");
assign(["26"], "Agenda");
assign(["27"], "Alunos");
assign(["28"], "Perfil do aluno");
assign(["29"], "Aula/Chamada");
assign(["30", "32"], "Financeiro");
assign(["31"], "Reposicoes");
assign(["33"], "Financeiro Kanban");
assign(["34"], "Movimentacoes financeiras");
assign(["35"], "Turmas");
assign(["36"], "Grade");
assign(["37"], "Vendas/Pipeline");
assign(["38"], "Interessados");
assign(["39"], "Aulas experimentais");
assign(["40"], "Matriculas");
assign(["41"], "Retencao");
assign(["42"], "Cancelamentos");
assign(["43"], "Reativacoes");
assign(["44"], "Reclamacoes");
assign(["45"], "Relatorios");
assign(["46"], "Dinheiro na Mesa");
assign(["47"], "Suporte Taliya");
assign(["48"], "Internal operacao");
assign(["49"], "Internal tenants");
assign(["50"], "Internal tenant detalhe");
assign(["51A", "51B", "51C", "51D", "51E", "51F", "51G", "51H", "51I", "51J", "51K", "51L", "78"], "Onboarding/setup");
assign(["52", "53"], "Agentes");
assign(["54", "56"], "Fluxos");
assign(["58"], "Simulacoes");
assign(["59"], "Publicacao de rotina");
assign(["60"], "Configuracoes");
assign(["61"], "Config. permissoes");
assign(["62"], "Config. pagamentos/financeiro");
assign(["63"], "Config. agenda");
assign(["64"], "Config. notificacoes/canais");
assign(["65"], "Billing Taliya");
assign(["66"], "Faturas Taliya");
assign(["67"], "Add-ons Taliya");
assign(["68"], "Uso e cotas");
assign(["69"], "Extrato de uso");
assign(["70"], "Execucao de fluxo");
assign(["71"], "Access shell");
assign(["72", "73"], "Conta basica");
assign(["74", "75", "76", "77"], "Escolha de plano/checkout Taliya");
assign(["79"], "Empty app shell");

function imageKey(image) {
  if (image.startsWith("24_round-4.1C")) return "24C";
  if (image.startsWith("24_round-4.1D")) return "24D";
  return image.split("_")[0];
}

const extraContracts = [
  {
    id: "internal-operacao",
    surface: "Internal operacao",
    route: "/internal",
    requiredBlocks: "saude operacional, tenants, atividade, alertas e atalhos",
    essentialActions: "abrir tenant, abrir fila, investigar alerta",
    essentialStates: "normal, degradado, critico, vazio",
    note: "Backoffice Taliya; fora do app do studio.",
    contractKind: "canonical-internal-surface",
  },
  {
    id: "internal-tenants",
    surface: "Internal tenants",
    route: "/internal/tenants",
    requiredBlocks: "lista, filtros, status, resumo e grants",
    essentialActions: "buscar, filtrar, abrir tenant, conceder ou revogar acesso",
    essentialStates: "ativo, bloqueado, degradado, grant ativo",
    note: "Backoffice Taliya; fora do app do studio.",
    contractKind: "canonical-internal-surface",
  },
  {
    id: "internal-tenant-detalhe",
    surface: "Internal tenant detalhe",
    route: "/internal/tenants/[tenantId]",
    requiredBlocks: "identidade, usuarios, grants, seguranca, auditoria e integracoes",
    essentialActions: "alternar aba, abrir regra, conceder ou revogar acesso, auditar",
    essentialStates: "ativo, restrito, grant aberto, incidente",
    note: "Backoffice Taliya; detalhe de seguranca do tenant.",
    contractKind: "canonical-internal-surface",
  },
  {
    id: "access-shell",
    surface: "Access shell",
    route: "Pre-CRM shell",
    requiredBlocks: "janela do produto, marca, slot principal, contexto e rodape",
    essentialActions: "abrir ajuda, conta e links institucionais aplicaveis",
    essentialStates: "base, autenticacao, assinatura",
    note: "Contrato estrutural da imagem 71; nao e uma pagina de negocio isolada.",
    contractKind: "derived-structural-surface",
  },
  {
    id: "empty-app-shell",
    surface: "Empty app shell",
    route: "Logged-in shell state",
    requiredBlocks: "sidebar, topbar, titulo e canvas vazio",
    essentialActions: "navegar, abrir acoes globais e perfil",
    essentialStates: "vazio, carregando, indisponivel",
    note: "Contrato estrutural da imagem 79; valida a casca sem conteudo de dominio.",
    contractKind: "derived-structural-surface",
  },
];

const sourceMarkdown = await readFile(sourceFile, "utf8");
const coverage = JSON.parse(await readFile(coverageFile, "utf8"));
const contracts = [...parseContractRows(sourceMarkdown), ...extraContracts];
const contractBySurface = new Map(contracts.map((contract) => [contract.surface, contract]));
const unmappedTargets = [];

for (const contract of contracts) {
  contract.structuralFamilies = structuralFamilies[contract.surface] ?? [];
  contract.visualTargets = [];
}

for (const target of coverage.rows) {
  const key = imageKey(target.image);
  const surface = imageSurfaceAssignments.get(key);
  const contract = contractBySurface.get(surface);
  if (!contract) {
    unmappedTargets.push({ image: target.image, storyId: target.storyId, key, surface });
    continue;
  }
  contract.visualTargets.push({
    image: target.image,
    storyId: target.storyId,
    storyTitle: target.storyTitle,
  });
}

const mappedTargets = contracts.flatMap((contract) => contract.visualTargets);
const duplicateTargets = mappedTargets.filter(
  (target, index) => mappedTargets.findIndex((row) => row.image === target.image) !== index,
);
const missingStructuralFamilies = contracts
  .filter((contract) => contract.structuralFamilies.length === 0)
  .map((contract) => contract.surface);
const contractsWithoutTargets = contracts
  .filter((contract) => contract.visualTargets.length === 0)
  .map((contract) => contract.surface);

if (
  unmappedTargets.length ||
  duplicateTargets.length ||
  mappedTargets.length !== coverage.rows.length ||
  missingStructuralFamilies.length
) {
  throw new Error(
    JSON.stringify(
      {
        expectedTargets: coverage.rows.length,
        mappedTargets: mappedTargets.length,
        unmappedTargets,
        duplicateTargets,
        missingStructuralFamilies,
      },
      null,
      2,
    ),
  );
}

let sourceCommit = "unknown";
try {
  sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: sourceRoot,
    encoding: "utf8",
  }).trim();
} catch {
  // A copied specification can still be snapshotted with unknown provenance.
}

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  source: {
    repository: sourceRoot,
    commit: sourceCommit,
    file: path.relative(sourceRoot, sourceFile),
  },
  surfaceCount: contracts.length,
  visualTargetCount: mappedTargets.length,
  contractsWithoutVisualTargets: contractsWithoutTargets,
  surfaces: contracts,
};

const markdownRows = contracts
  .map(
    (contract) =>
      `| ${contract.surface} | \`${contract.route}\` | ${contract.structuralFamilies.join(" + ")} | ${contract.visualTargets.length} | pending | pending |`,
  )
  .join("\n");
const markdown = `# Product Surface Inventory\n\nGenerated: ${report.generatedAt}\n\n- Product surfaces: ${report.surfaceCount}\n- Visual targets mapped exactly once: ${report.visualTargetCount}\n- Surfaces without a dedicated visual target: ${contractsWithoutTargets.length}\n\n| Surface | Route | Structural family | Targets | Codex | Product owner |\n| --- | --- | --- | ---: | --- | --- |\n${markdownRows}\n`;

await writeFile(
  path.join(outputDir, "surface-contracts.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
await writeFile(path.join(outputDir, "surface-contracts.md"), markdown);

console.log(
  `Joint product contracts: surfaces=${contracts.length}; targets=${mappedTargets.length}; without-targets=${contractsWithoutTargets.length}.`,
);
