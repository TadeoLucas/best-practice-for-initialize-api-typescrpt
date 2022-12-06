import connection from "../../config/db";
import User from "../user/user.model";
import { DataType } from "sequelize-typescript";
import { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

type ACCES_TYPES = "SUDO" | "ADMIN" | "EDITOR" | "USER" | "VISITOR";

export interface RoleI {
  id?: string;
  access: ACCES_TYPES;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleI, "id"> {}
export interface RoleOuput extends Required<RoleI> {}

class Role extends Model<RoleI, RoleInput> {
  public id!: string;
  public access!: ACCES_TYPES;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      primaryKey: true,
      type: DataType.UUID,
    },
    access: {
      type: DataType.ENUM("SUDO", "ADMIN", "EDITOR", "USER", "VISITOR"),
      allowNull: false,
      defaultValue: "VISITOR"
    },
  },
  {
    timestamps: true,
    sequelize: connection,
  }
);

Role.beforeCreate((role) => {
  role.id = uuidv4();
});


Role.hasMany(User, {
  foreignKey: "userId",
  onDelete: "NO ACTION",
});
User.belongsTo(Role, {
  foreignKey: "userId",
  onDelete: "NO ACTION",
});


export default Role;