using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExportPortal.API.Migrations
{
    /// <inheritdoc />
    public partial class quotations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "AspNetUsers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "QuotationItemAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CustomerId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ItemId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    VendorId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuotationItemAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuotationItemAssignments_AspNetUsers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuotationItemAssignments_AspNetUsers_VendorId",
                        column: x => x.VendorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuotationItemAssignments_QuotationItems_ItemId",
                        column: x => x.ItemId,
                        principalTable: "QuotationItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_QuotationItemAssignments_CustomerId",
                table: "QuotationItemAssignments",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_QuotationItemAssignments_ItemId",
                table: "QuotationItemAssignments",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_QuotationItemAssignments_VendorId",
                table: "QuotationItemAssignments",
                column: "VendorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuotationItemAssignments");

            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "AspNetUsers");
        }
    }
}
