const { DataTypes } = require("sequelize");
const {sequelize} = require("../db/sequelize");

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
    backgroundUrl: {
      type: DataTypes.STRING,
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
      type: DataTypes.DECIMAL(20, 2),
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
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

db.TaskAssignee = sequelize.define(
  "TaskAssignee",
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
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.Checklist = sequelize.define(
  "Checklist",
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
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskId: {
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

db.TaskAttachment = sequelize.define(
  "TaskAttachment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    fileType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

db.User.hasMany(db.Board, {
  as: "ownedBoards",
  foreignKey: "ownerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Board.belongsTo(db.User, {
  as: "owner",
  foreignKey: "ownerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Board.hasMany(db.List, {
  as: "lists",
  foreignKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.List.belongsTo(db.Board, {
  as: "board",
  foreignKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.List.hasMany(db.Task, {
  as: "tasks",
  foreignKey: "listId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Task.belongsTo(db.List, {
  as: "list",
  foreignKey: "listId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User.hasMany(db.TaskComment, {
  as: "comments",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskComment.belongsTo(db.User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Task.hasMany(db.TaskComment, {
  as: "comments",
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskComment.belongsTo(db.Task, {
  as: "task",
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Task.hasMany(db.Checklist, {
  as: "checklists",
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Checklist.belongsTo(db.Task, {
  as: "task",
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User.belongsToMany(db.Board, {
  as: "boards",
  through: db.BoardMember,
  foreignKey: "userId",
  otherKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Board.belongsToMany(db.User, {
  as: "members",
  through: db.BoardMember,
  foreignKey: "boardId",
  otherKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.BoardMember.belongsTo(db.User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User.belongsToMany(db.Task, {
  as: "tasks",
  through: db.TaskAssignee,
  foreignKey: "userId",
  otherKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Task.belongsToMany(db.User, {
  as: "assignees",
  through: db.TaskAssignee,
  foreignKey: "taskId",
  otherKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskAssignee.belongsTo(db.User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// TaskAttachment associations
db.Task.hasMany(db.TaskAttachment, {
  as: "attachments",
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskAttachment.belongsTo(db.Task, {
  as: "task",
  foreignKey: "taskId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User.hasMany(db.TaskAttachment, {
  as: "uploadedAttachments",
  foreignKey: "uploadedBy",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.TaskAttachment.belongsTo(db.User, {
  as: "uploader",
  foreignKey: "uploadedBy",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = db;
