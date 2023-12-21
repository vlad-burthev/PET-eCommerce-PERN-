import { DataTypes } from "sequelize";
import { connectToDb } from "../db/index.js";

export const User = connectToDb.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
  },
  {
    timestamps: false,
  }
);

export const UserCart = connectToDb.define(
  "user-cart",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    //userId
  },
  {
    timestamps: false,
  }
);

export const CartDevice = connectToDb.define(
  "cart-device",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    //userCartId
    //deviceId
    amount: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  },
  {
    timestamps: false,
  }
);

export const Device = connectToDb.define(
  "device",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    sale: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    description: { type: DataTypes.STRING, allowNull: false },
    //brand_id
    //type_id
    //ratings
    //info
  },
  {
    timestamps: false,
  }
);

export const DeviceInfo = connectToDb.define(
  "device-info",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    //deviceId
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
  }
);

export const DeviceRating = connectToDb.define(
  "device-rating",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    //deviceId
    //userId
    rating: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

export const Type = connectToDb.define(
  "type",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    timestamps: false,
  }
);

export const Brand = connectToDb.define(
  "brand",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    timestamps: false,
  }
);

export const TypeBrand = connectToDb.define(
  "type-brand",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  },
  {
    timestamps: false,
  }
);

Brand.belongsToMany(Type, { through: TypeBrand });
Type.belongsToMany(Brand, { through: TypeBrand });

User.hasOne(UserCart, { onDelete: "CASCADE", as: "cart" });
UserCart.belongsTo(User);

User.hasOne(DeviceRating);
DeviceRating.belongsTo(User);

Device.hasMany(DeviceRating, { onDelete: "CASCADE", as: "rating" });
DeviceRating.belongsTo(Device);

Device.hasMany(DeviceInfo, { onDelete: "CASCADE", as: "info" });
DeviceInfo.belongsTo(Device);

Device.hasMany(CartDevice, { onDelete: "CASCADE" });
CartDevice.belongsTo(Device);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

UserCart.hasMany(CartDevice, { onDelete: "CASCADE", as: "devices" });
CartDevice.belongsTo(UserCart);

export const models = {
  User,
  UserCart,
  CartDevice,
  Device,
  DeviceInfo,
  DeviceRating,
  Type,
  Brand,
  TypeBrand,
};
