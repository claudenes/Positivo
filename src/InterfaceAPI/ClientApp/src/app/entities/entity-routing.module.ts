import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      {
        path: "funcionarios",
        data: { pageTitle: "Funcionarios" },
        loadChildren: () =>
          import("./funcionarios/funcionarios.module").then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: "turmas",
        data: { pageTitle: "Turmas" },
        loadChildren: () =>
          import("./turmas/turmas.module").then((m) => m.TurmasModule),
      },
      {
        path: "alunos",
        data: { pageTitle: "Alunos" },
        loadChildren: () =>
          import("./alunos/alunos.module").then((m) => m.AlunosModule),
      },
      {
        path: "alunos-turma",
        data: { pageTitle: "AlunosTurmas" },
        loadChildren: () =>
          import("./alunos-turma/alunos-turma.module").then(
            (m) => m.AlunosTurmaModule
          ),
      },
      {
        path: "pessoas-contato",
        data: { pageTitle: "PessoasContatoes" },
        loadChildren: () =>
          import("./pessoas-contato/pessoas-contato.module").then(
            (m) => m.PessoasContatoModule
          ),
      },
      {
        path: "professores",
        data: { pageTitle: "Professores" },
        loadChildren: () =>
          import("./professores/professores.module").then(
            (m) => m.ProfessoresModule
          ),
      },
      {
        path: "professores-turma",
        data: { pageTitle: "ProfessoresTurmas" },
        loadChildren: () =>
          import("./professores-turma/professores-turma.module").then(
            (m) => m.ProfessoresTurmaModule
          ),
      },
      {
        path: "unidades-fisicas",
        data: { pageTitle: "UnidadesFisicas" },
        loadChildren: () =>
          import("./unidades-fisicas/unidades-fisicas.module").then(
            (m) => m.UnidadesFisicasModule
          ),
      },
      {
        path: "niveis-ensino",
        data: { pageTitle: "NiveisEnsinos" },
        loadChildren: () =>
          import("./niveis-ensino/niveis-ensino.module").then(
            (m) => m.NiveisEnsinoModule
          ),
      },
      {
        path: "interface-integracao",
        data: { pageTitle: "InterfaceIntegracaos" },
        loadChildren: () =>
          import("./interface-integracao/interface-integracao.module").then(
            (m) => m.InterfaceIntegracaoModule
          ),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
