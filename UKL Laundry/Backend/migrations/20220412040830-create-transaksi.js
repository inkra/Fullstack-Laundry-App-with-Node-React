'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "outlet",
          key: "id_outlet"
        }
      },
      kode_invoice: {
        type: Sequelize.STRING
      },
      id_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "member",
          key: "id_member"
        }
      },
      tgl: {
        type: Sequelize.DATE
      },
      batas_waktu: {
        type: Sequelize.DATE
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      biaya_tambahan: {
        type: Sequelize.INTEGER
      },
      diskon: {
        type: Sequelize.DOUBLE
      },
      pajak: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('baru', 'proses', 'selesai', 'diambil')
      },
      dibayar: {
        type: Sequelize.ENUM('dibayar', 'belum_bayar')
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id_user"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};