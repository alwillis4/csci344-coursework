-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting
SELECT id, first_name, last_name
FROM users
ORDER BY last_name;



-- Exercise 4: FilteringFilter
SELECT id, image_url, user_id
FROM posts
WHERE user_id = 26;


-- Exercise 5: Filtering with logical operators
SELECT id, image_url, user_id
FROM posts
WHERE user_id IN (12, 26);



-- Exercise 6: Using functions in a select statement
SELECT COUNT(*) AS count
FROM posts;



-- Exercise 7: Aggregating data
SELECT user_id, COUNT(*) AS count
FROM comments
GROUP BY user_id
ORDER BY count DESC;



-- Exercise 8: Joining: two tables
SELECT 
    posts.id, 
    posts.image_url, 
    posts.user_id, 
    users.username, 
    users.first_name, 
    users.last_name
FROM posts
JOIN users ON posts.user_id = users.id
WHERE posts.user_id IN (12, 26);



-- Exercise 9: More joining practice: two tables
SELECT posts.id, posts.pub_date, following.following_id
FROM posts
JOIN following ON posts.user_id = following.following_id
WHERE following.user_id = 26;



-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records
INSERT INTO bookmarks (user_id, post_id)
VALUES (26, 219),
       (26, 220),
       (26, 221)



-- Exercise 12: Deleting records

DELETE FROM bookmarks
WHERE user_id = 26 AND post_id IN (219, 220, 221);


-- Exercise 13: Updating records
UPDATE users
SET email = 'knick2022@gmail.com'
WHERE id = 26;



-- Exercise 14: More Querying Practice (Optional)
