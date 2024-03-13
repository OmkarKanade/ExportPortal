﻿// <auto-generated />
using System;
using ExportPortal.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ExportPortal.API.Migrations
{
    [DbContext(typeof(ExportPortalDbContext))]
    partial class ExportPortalDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Certification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Certifications");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Currency", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("BagOrBox")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("BagOrBoxBumpers")
                        .HasColumnType("int");

                    b.Property<int>("BumperisPouches")
                        .HasColumnType("int");

                    b.Property<Guid?>("CertificationId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("DairyDeclarationRequired")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("Fumigation")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("GrossWeight")
                        .HasColumnType("int");

                    b.Property<string>("HSNCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ImgPath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Ingredients")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("InnerPackageMaterial")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("IsForHumanConsumption")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("LocalTransport")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("MachinePackage")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("ManualPackage")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("ManufacturingProcess")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("OuterPackageMaterial")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("PouchType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProductId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ScientificName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("ToPuneFreight")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("TotalRate")
                        .HasColumnType("decimal(65,30)");

                    b.Property<Guid>("VendorCategoryId")
                        .HasColumnType("char(36)");

                    b.Property<string>("VendorId1")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("VendorId2")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("VendorId3")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CertificationId");

                    b.HasIndex("VendorCategoryId");

                    b.HasIndex("VendorId1");

                    b.HasIndex("VendorId2");

                    b.HasIndex("VendorId3");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Quotation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CustomerId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<bool>("Status")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Quotations");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.QuotationItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("char(36)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<Guid>("QuotationId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("QuotationId");

                    b.ToTable("QuotationItems");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.QuotationItemAssignment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CustomerId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<Guid>("ItemId")
                        .HasColumnType("char(36)");

                    b.Property<string>("VendorId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("ItemId");

                    b.HasIndex("VendorId");

                    b.ToTable("QuotationItemAssignments");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.UserProfile", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("OrganizationName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<Guid?>("VendorCategoryId")
                        .HasColumnType("char(36)");

                    b.Property<int>("Zipcode")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("VendorCategoryId");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.VendorCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("VendorCategories");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "7f541d69-7524-4077-bcb8-bdbe3fd836e0",
                            ConcurrencyStamp = "7f541d69-7524-4077-bcb8-bdbe3fd836e0",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "1beefd77-dac2-4b30-b285-4407bfd1507f",
                            ConcurrencyStamp = "1beefd77-dac2-4b30-b285-4407bfd1507f",
                            Name = "Vendor",
                            NormalizedName = "VENDOR"
                        },
                        new
                        {
                            Id = "8bb312cb-0bbc-4788-9b55-8520aaa01e35",
                            ConcurrencyStamp = "8bb312cb-0bbc-4788-9b55-8520aaa01e35",
                            Name = "Customer",
                            NormalizedName = "CUSTOMER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Product", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.Certification", "Certification")
                        .WithMany()
                        .HasForeignKey("CertificationId");

                    b.HasOne("ExportPortal.API.Models.Domain.VendorCategory", "VendorCategory")
                        .WithMany()
                        .HasForeignKey("VendorCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", "UserProfile1")
                        .WithMany()
                        .HasForeignKey("VendorId1");

                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", "UserProfile2")
                        .WithMany()
                        .HasForeignKey("VendorId2");

                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", "UserProfile3")
                        .WithMany()
                        .HasForeignKey("VendorId3");

                    b.Navigation("Certification");

                    b.Navigation("UserProfile1");

                    b.Navigation("UserProfile2");

                    b.Navigation("UserProfile3");

                    b.Navigation("VendorCategory");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Quotation", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.QuotationItem", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExportPortal.API.Models.Domain.Quotation", "Quotation")
                        .WithMany("Items")
                        .HasForeignKey("QuotationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Quotation");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.QuotationItemAssignment", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExportPortal.API.Models.Domain.QuotationItem", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Item");

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.UserProfile", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.VendorCategory", "VendorCategory")
                        .WithMany()
                        .HasForeignKey("VendorCategoryId");

                    b.Navigation("VendorCategory");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("ExportPortal.API.Models.Domain.UserProfile", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExportPortal.API.Models.Domain.Quotation", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
