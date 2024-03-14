﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class DetailedTimeline : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetailedTimelines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailedTimelines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailedTimelines_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetailedTimelines_ProjectId",
                table: "DetailedTimelines",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailedTimelines");
        }
    }
}
