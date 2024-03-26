using System;
using System.Collections.Generic;
using EcommerceTCG.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceTCG.Data;

public partial class EcommerceTcgContext : DbContext
{
    public EcommerceTcgContext()
    {
    }

    public EcommerceTcgContext(DbContextOptions<EcommerceTcgContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CardType> CardTypes { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Coupon> Coupons { get; set; }

    public virtual DbSet<Expansion> Expansions { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Rarity> Rarities { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Shipment> Shipments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=FRANCESCO-PC\\SQLEXPRESS;Initial Catalog=EcommerceTCG;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CardType>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PK__CardType__516F03953910463B");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A2BF3C2B37E");

            entity.HasOne(d => d.Type).WithMany(p => p.Categories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Categorie__TypeI__49C3F6B7");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.CouponId).HasName("PK__Coupons__384AF1DA24C9D5E2");
        });

        modelBuilder.Entity<Expansion>(entity =>
        {
            entity.HasKey(e => e.ExpansionId).HasName("PK__Expansio__D1BAED5F47E808E3");

            entity.HasOne(d => d.Type).WithMany(p => p.Expansions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Expansion__TypeI__3E52440B");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF09367004");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__UserID__5070F446");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30C4FC9F5F9");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderDeta__Order__534D60F1");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderDeta__Produ__5441852A");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__B40CC6ED7F2E668D");

            entity.HasOne(d => d.Expansion).WithMany(p => p.Products)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Products__Expans__45F365D3");

            entity.HasOne(d => d.Rarity).WithMany(p => p.Products)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Products__Rarity__44FF419A");

            entity.HasOne(d => d.Type).WithMany(p => p.Products)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Products__TypeID__46E78A0C");

            entity.HasMany(d => d.Categories).WithMany(p => p.Products)
                .UsingEntity<Dictionary<string, object>>(
                    "ProductCategory",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ProductCa__Categ__4D94879B"),
                    l => l.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ProductCa__Produ__4CA06362"),
                    j =>
                    {
                        j.HasKey("ProductId", "CategoryId").HasName("PK__ProductC__159C554FB5D2E8C8");
                        j.ToTable("ProductCategories");
                        j.IndexerProperty<int>("ProductId").HasColumnName("ProductID");
                        j.IndexerProperty<int>("CategoryId").HasColumnName("CategoryID");
                    });
        });

        modelBuilder.Entity<Rarity>(entity =>
        {
            entity.HasKey(e => e.RarityId).HasName("PK__Rarities__8AEB5CB6B475B3AB");

            entity.HasOne(d => d.Type).WithMany(p => p.Rarities)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rarities__TypeID__412EB0B6");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PK__Reviews__74BC79AE51DEFEFB");

            entity.HasOne(d => d.Order).WithMany(p => p.Reviews)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reviews__OrderID__571DF1D5");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reviews__UserID__5812160E");
        });

        modelBuilder.Entity<Shipment>(entity =>
        {
            entity.HasKey(e => e.ShipmentId).HasName("PK__Shipment__5CAD378DCD42A3F4");

            entity.HasOne(d => d.Order).WithMany(p => p.Shipments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Shipments__Order__5AEE82B9");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC47C2AFF2");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.WishlistId).HasName("PK__Wishlist__233189CB09ED5CE7");

            entity.HasOne(d => d.Product).WithMany(p => p.Wishlists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Wishlists__Produ__619B8048");

            entity.HasOne(d => d.User).WithMany(p => p.Wishlists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Wishlists__UserI__60A75C0F");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
