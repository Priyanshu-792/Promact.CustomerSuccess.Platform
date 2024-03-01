using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class FixApplicationUserEscalationMatrix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Users_ApplicationUserId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_ApplicationUserId",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "EscalationMatrices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ApplicationUserId",
                table: "EscalationMatrices",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_ApplicationUserId",
                table: "EscalationMatrices",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Users_ApplicationUserId",
                table: "EscalationMatrices",
                column: "ApplicationUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
