import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getAllPosts() {
  const fileNames = await fs.readdir(postsDirectory);

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: fileName.replace(/\.mdx$/, ""),
        date: data.date,
        modified: data.modified,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        ...data,
      };
    }),
  );

  // Sort posts by date (descending)
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
