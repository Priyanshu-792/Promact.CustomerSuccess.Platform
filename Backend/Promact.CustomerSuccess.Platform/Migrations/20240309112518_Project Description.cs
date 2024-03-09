using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class ProjectDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "DocumentVersions",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProjectDescriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectDescriptions_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentVersions_ProjectId",
                table: "DocumentVersions",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDescriptions_ProjectId",
                table: "ProjectDescriptions",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentVersions_Projects_ProjectId",
                table: "DocumentVersions",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DocumentVersions_Projects_ProjectId",
                table: "DocumentVersions");

            migrationBuilder.DropTable(
                name: "ProjectDescriptions");

            migrationBuilder.DropIndex(
                name: "IX_DocumentVersions_ProjectId",
                table: "DocumentVersions");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "DocumentVersions");
        }
    }
}
