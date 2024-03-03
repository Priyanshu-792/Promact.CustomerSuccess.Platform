using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class ProjectResources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectBudgets_BudgetId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_BudgetId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "BudgetId",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ProjectBudgets",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgets_ProjectId",
                table: "ProjectBudgets",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId",
                table: "ProjectBudgets",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.AddColumn<Guid>(
                name: "BudgetId",
                table: "Projects",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_BudgetId",
                table: "Projects",
                column: "BudgetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectBudgets_BudgetId",
                table: "Projects",
                column: "BudgetId",
                principalTable: "ProjectBudgets",
                principalColumn: "Id");
        }
    }
}
