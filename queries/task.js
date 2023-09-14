export default {
  createTask: `
    INSERT INTO tasks(
        title,
        description,
        user_id
    ) VALUES ($1, $2, $3) RETURNING id
    `,

  fetchAllTasks: `
    SELECT t.id, t.title, t.description, t.completed,
    json_build_object(
        'id', u.id,
        'email', u.email
    ) as user
    FROM tasks t
    INNER JOIN users u on t.user_id = u.id
    WHERE t.title ILIKE $1
    `,

  setCompleted: `
    UPDATE tasks
    SET completed=true
    WHERE id=$1
    RETURNING id
    `,

  fetchTaskUser: `
    SELECT user_id as "userId" FROM tasks
    WHERE id=$1
    `,
};
