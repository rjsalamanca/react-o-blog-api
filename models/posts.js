const db = require('./conn.js');

class Posts {
    constructor(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from posts;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(p_id) {
        try {
            const response = await db.one(`
                SELECT * from posts
                WHERE id = $1`, [p_id]);
            return response;
        } catch (err) {
            return (err.message);
        }
    }

    static async removeEntry(p_id) {
        try {
            const response = await db.result(`
                DELETE FROM posts
                WHERE id = $1`, [p_id]
            )
            return response;
        } catch (err) {
            return err.message
        }
    }

    static async addPost(title, author, content) {
        try {
            const response = await db.result(`
                INSERT INTO posts
                    (title, author_id, content)
                VALUES
                    ($1,$2,$3)`, [title, author, content]
            )
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async updateEntry(id, column, content) {
        try {
            const response = await db.result(`
                UPDATE posts
                SET ${column} = $1
                WHERE id = $2
            `, [content, id])
            return response;
        } catch (err) {
            return err.message
        }
    }
}

module.exports = Posts;