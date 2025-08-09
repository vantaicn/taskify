const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const db = {};

db.User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.Board = sequelize.define(
  "Board",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.List = sequelize.define(
  "List",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    position: {
      type: DataTypes.DECIMAL(20, 10),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    listId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    position: {
      type: DataTypes.DECIMAL(20, 10),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.TaskComment = sequelize.define(
  "TaskComment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.BoardMember = sequelize.define(
  "BoardMember",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.User.hasMany(db.Board, {
  foreignKey: "ownerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Board.belongsTo(db.User, {
  foreignKey: "ownerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Board.hasMany(db.List, {
  foreignKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.List.belongsTo(db.Board, {
  foreignKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.List.hasMany(db.Task, {
  foreignKey: "listId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Task.belongsTo(db.List, {
  foreignKey: "listId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User.hasMany(db.TaskComment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskComment.belongsTo(db.User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Task.hasMany(db.TaskComment, {
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskComment.belongsTo(db.Task, {
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User.belongsToMany(db.Board, {
  through: db.BoardMember,
  foreignKey: "userId",
  otherKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Board.belongsToMany(db.User, {
  through: db.BoardMember,
  foreignKey: "boardId",
  otherKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = db;
