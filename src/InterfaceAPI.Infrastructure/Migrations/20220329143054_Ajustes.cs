using Microsoft.EntityFrameworkCore.Migrations;

namespace Positivo.InterfaceAPI.Infrastructure.Migrations
{
    public partial class Ajustes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Pessa",
                table: "pessoas_contato",
                newName: "Pessoa");

            migrationBuilder.RenameColumn(
                name: "Unidadefolha",
                table: "funcionarios",
                newName: "UnidadefisicaFolha");

            migrationBuilder.RenameColumn(
                name: "Funcinario",
                table: "funcionarios",
                newName: "Funcionario");

            migrationBuilder.AddColumn<long>(
                name: "NiveisEnsinoId",
                table: "turmas",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UnidadesFisicasId",
                table: "turmas",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "NiveisEnsinoId",
                table: "alunos",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UnidadesFisicasId",
                table: "alunos",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_turmas_NiveisEnsinoId",
                table: "turmas",
                column: "NiveisEnsinoId");

            migrationBuilder.CreateIndex(
                name: "IX_turmas_UnidadesFisicasId",
                table: "turmas",
                column: "UnidadesFisicasId");

            migrationBuilder.CreateIndex(
                name: "IX_alunos_NiveisEnsinoId",
                table: "alunos",
                column: "NiveisEnsinoId");

            migrationBuilder.CreateIndex(
                name: "IX_alunos_UnidadesFisicasId",
                table: "alunos",
                column: "UnidadesFisicasId");

            migrationBuilder.AddForeignKey(
                name: "FK_alunos_niveis_ensino_NiveisEnsinoId",
                table: "alunos",
                column: "NiveisEnsinoId",
                principalTable: "niveis_ensino",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_alunos_unidades_fisicas_UnidadesFisicasId",
                table: "alunos",
                column: "UnidadesFisicasId",
                principalTable: "unidades_fisicas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_turmas_niveis_ensino_NiveisEnsinoId",
                table: "turmas",
                column: "NiveisEnsinoId",
                principalTable: "niveis_ensino",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_turmas_unidades_fisicas_UnidadesFisicasId",
                table: "turmas",
                column: "UnidadesFisicasId",
                principalTable: "unidades_fisicas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_alunos_niveis_ensino_NiveisEnsinoId",
                table: "alunos");

            migrationBuilder.DropForeignKey(
                name: "FK_alunos_unidades_fisicas_UnidadesFisicasId",
                table: "alunos");

            migrationBuilder.DropForeignKey(
                name: "FK_turmas_niveis_ensino_NiveisEnsinoId",
                table: "turmas");

            migrationBuilder.DropForeignKey(
                name: "FK_turmas_unidades_fisicas_UnidadesFisicasId",
                table: "turmas");

            migrationBuilder.DropIndex(
                name: "IX_turmas_NiveisEnsinoId",
                table: "turmas");

            migrationBuilder.DropIndex(
                name: "IX_turmas_UnidadesFisicasId",
                table: "turmas");

            migrationBuilder.DropIndex(
                name: "IX_alunos_NiveisEnsinoId",
                table: "alunos");

            migrationBuilder.DropIndex(
                name: "IX_alunos_UnidadesFisicasId",
                table: "alunos");

            migrationBuilder.DropColumn(
                name: "NiveisEnsinoId",
                table: "turmas");

            migrationBuilder.DropColumn(
                name: "UnidadesFisicasId",
                table: "turmas");

            migrationBuilder.DropColumn(
                name: "NiveisEnsinoId",
                table: "alunos");

            migrationBuilder.DropColumn(
                name: "UnidadesFisicasId",
                table: "alunos");

            migrationBuilder.RenameColumn(
                name: "Pessoa",
                table: "pessoas_contato",
                newName: "Pessa");

            migrationBuilder.RenameColumn(
                name: "UnidadefisicaFolha",
                table: "funcionarios",
                newName: "Unidadefolha");

            migrationBuilder.RenameColumn(
                name: "Funcionario",
                table: "funcionarios",
                newName: "Funcinario");
        }
    }
}
