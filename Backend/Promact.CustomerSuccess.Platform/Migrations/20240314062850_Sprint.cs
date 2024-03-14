using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class Sprint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
                table: "Sprints");

            migrationBuilder.RenameColumn(
                name: "PhaseMilestoneId",
                table: "Sprints",
                newName: "ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Sprints_PhaseMilestoneId",
                table: "Sprints",
                newName: "IX_Sprints_ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Projects_ProjectId",
                table: "Sprints",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_Projects_ProjectId",
                table: "Sprints");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Sprints",
                newName: "PhaseMilestoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Sprints_ProjectId",
                table: "Sprints",
                newName: "IX_Sprints_PhaseMilestoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
                table: "Sprints",
                column: "PhaseMilestoneId",
                principalTable: "PhaseMilestones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
