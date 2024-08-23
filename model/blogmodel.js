module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Blog;
};