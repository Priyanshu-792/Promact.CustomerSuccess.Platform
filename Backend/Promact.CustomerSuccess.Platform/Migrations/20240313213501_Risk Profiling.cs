using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class RiskProfiling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RemediationStep");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateReceived",
                table: "RiskProfiles",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RiskProfiles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RemedialSteps",
                table: "RiskProfiles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "RiskProfiles",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateReceived",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "RemedialSteps",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "RiskProfiles");

            migrationBuilder.CreateTable(
                name: "RemediationStep",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true),
                    RiskProfileId = table.Column<Guid>(type: "uuid", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ExtraProperties = table.Column<string>(type: "text", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemediationStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemediationStep_RiskProfiles_RiskProfileId",
                        column: x => x.RiskProfileId,
                        principalTable: "RiskProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RemediationStep_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RemediationStep_Users_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RemediationStep_CreatorId",
                table: "RemediationStep",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_RemediationStep_LastModifierId",
                table: "RemediationStep",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_RemediationStep_RiskProfileId",
                table: "RemediationStep",
                column: "RiskProfileId");
        }
    }
}
