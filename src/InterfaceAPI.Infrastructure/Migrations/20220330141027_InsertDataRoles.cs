using Microsoft.EntityFrameworkCore.Migrations;

namespace Positivo.InterfaceAPI.Infrastructure.Migrations
{
    public partial class InsertDataRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
               table: "Roles",
               columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
               values: new object[,]
               {
                    { "role_turmas_consulta","ROLE_TURMAS_CONSULTA","ROLE_TURMAS_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_turmas_alteracao","ROLE_TURMAS_ALTERACAO","ROLE_TURMAS_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },

                    { "role_alunos_consulta"    ,"ROLE_ALUNOS_CONSULTA" ,"ROLE_ALUNOS_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_alunos_alteracao"   ,"ROLE_ALUNOS_ALTERACAO","ROLE_ALUNOS_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },

                    { "role_professores_consulta" ,"ROLE_PROFESSORES_CONSULTA"    ,"ROLE_PROFESSORES_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_professores_alteracao","ROLE_PROFESSORES_ALTERACAO"   ,"ROLE_PROFESSORES_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },

                    { "role_pessoascontato_consulta" ,"ROLE_PESSOASCONTATO_CONSULTA" ,"ROLE_PESSOASCONTATO_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_pessoascontato_alteracao","ROLE_PESSOASCONTATO_ALTERACAO","ROLE_PESSOASCONTATO_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },

                    { "role_funcionarios_consulta" ,"ROLE_FUNCIONARIOS_CONSULTA" ,"ROLE_FUNCIONARIOS_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_funcionarios_alteracao","ROLE_FUNCIONARIOS_ALTERACAO","ROLE_FUNCIONARIOS_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },

                    { "role_niveisensino_consulta" ,"ROLE_NIVEISENSINO_CONSULTA" ,"ROLE_NIVEISENSINO_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_niveisensino_alteracao","ROLE_NIVEISENSINO_ALTERACAO","ROLE_NIVEISENSINO_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },

                    { "role_unidadesfisicas_consulta" ,"ROLE_UNIDADESFISICAS_CONSULTA" ,"ROLE_UNIDADESFISICAS_CONSULTA","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
                    { "role_unidadesfisicas_alteracao","ROLE_UNIDADESFISICAS_ALTERACAO","ROLE_UNIDADESFISICAS_ALTERACAO","b5d69f1b-776a-4b93-9615-3c242b434ee5" },
               });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
