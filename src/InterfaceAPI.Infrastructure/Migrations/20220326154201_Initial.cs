using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Positivo.InterfaceAPI.Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "alunos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Aluno = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Pessoa = table.Column<decimal>(type: "decimal(10,0)", nullable: true),
                    Nome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Sobrenome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Primeironome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Situacao = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Turno = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Curriculo = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Serie = table.Column<int>(type: "int", nullable: true),
                    Anoingresso = table.Column<int>(type: "int", nullable: true),
                    Senha = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alunos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "funcionarios",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Funcinario = table.Column<decimal>(type: "decimal(10,0)", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Primeironome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Sobrenome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Datanascimento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Cpf = table.Column<decimal>(type: "decimal(11,0)", nullable: true),
                    Unidadefolha = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Senha = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Situacao = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_funcionarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "interface_integracao",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nomeintegracao = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Servidorondeestainstalado = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Usuario = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Senha = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_interface_integracao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "niveis_ensino",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nivelensino = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Unidaderesponsavel = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Situacao = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_niveis_ensino", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "pessoas_contato",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pessoa = table.Column<decimal>(type: "decimal(10,0)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Emailgoogle = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Endereco = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Endnum = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Endcompl = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Bairro = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Municipio = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Uf = table.Column<string>(type: "nvarchar(2)", nullable: true),
                    Cep = table.Column<string>(type: "nvarchar(8)", nullable: true),
                    Dddfone = table.Column<string>(type: "nvarchar(3)", nullable: true),
                    Fone = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Dddcelular = table.Column<string>(type: "nvarchar(3)", nullable: true),
                    Celular = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Dddcomercial = table.Column<string>(type: "nvarchar(3)", nullable: true),
                    Comercial = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pessoas_contato", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "professores",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Professor = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Pessoa = table.Column<decimal>(type: "decimal(10,0)", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Primeironome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Sobrenome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Situacao = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Senha = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_professores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });


            migrationBuilder.CreateTable(
                name: "turmas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Turma = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Turno = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Curriculo = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Serie = table.Column<int>(type: "int", nullable: true),
                    Ano = table.Column<int>(type: "int", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_turmas", x => x.Id);
                });
            
            migrationBuilder.CreateTable(
                name: "unidades_fisicas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Unidadefisica = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Unidadefisicafolha = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Nome = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Cnpj = table.Column<string>(type: "nvarchar(19)", nullable: true),
                    Situacao = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unidades_fisicas", x => x.Id);
                });
            
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    first_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Activated = table.Column<bool>(type: "bit", nullable: false),
                    lang_key = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    image_url = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    activation_key = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    reset_key = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    reset_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
            
            
            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            
            migrationBuilder.CreateTable(
                name: "alunos_turma",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AlunosId = table.Column<long>(type: "bigint", nullable: true),
                    TurmasId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alunos_turma", x => x.Id);
                    table.ForeignKey(
                        name: "FK_alunos_turma_alunos_AlunosId",
                        column: x => x.AlunosId,
                        principalTable: "alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_alunos_turma_turmas_TurmasId",
                        column: x => x.TurmasId,
                        principalTable: "turmas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "professores_turma",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dtatualizacao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProfessoresId = table.Column<long>(type: "bigint", nullable: true),
                    TurmasId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_professores_turma", x => x.Id);
                    table.ForeignKey(
                        name: "FK_professores_turma_professores_ProfessoresId",
                        column: x => x.ProfessoresId,
                        principalTable: "professores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_professores_turma_turmas_TurmasId",
                        column: x => x.TurmasId,
                        principalTable: "turmas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });
            
            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            
            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            
            migrationBuilder.CreateIndex(
                name: "IX_alunos_turma_AlunosId",
                table: "alunos_turma",
                column: "AlunosId");

            migrationBuilder.CreateIndex(
                name: "IX_alunos_turma_TurmasId",
                table: "alunos_turma",
                column: "TurmasId");

            migrationBuilder.CreateIndex(
                name: "IX_professores_turma_ProfessoresId",
                table: "professores_turma",
                column: "ProfessoresId");

            migrationBuilder.CreateIndex(
                name: "IX_professores_turma_TurmasId",
                table: "professores_turma",
                column: "TurmasId");
            
            migrationBuilder.CreateIndex(
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");
            
            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogins_UserId",
                table: "UserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId1",
                table: "UserRoles",
                column: "UserId1");
         
            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");
            
            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alunos_turma");

            migrationBuilder.DropTable(
                name: "funcionarios");

            migrationBuilder.DropTable(
                name: "interface_integracao");

            migrationBuilder.DropTable(
                name: "niveis_ensino");

            migrationBuilder.DropTable(
                name: "pessoas_contato");

            migrationBuilder.DropTable(
                name: "professores_turma");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "unidades_fisicas");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "alunos");

            migrationBuilder.DropTable(
                name: "professores");

            migrationBuilder.DropTable(
                name: "turmas");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
