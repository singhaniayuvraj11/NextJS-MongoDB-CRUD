"use server";
import client from "@/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const db = client.db("next-todos");

/**
 * GET all todos
 * @returns
 */
export async function getTodos() {
  try {
    const todos = await db.collection("todos").find().toArray();
    return todos;
  } catch (e) {
    console.log(e);
  }
}

export async function createTodo(text) {
  const todo = await db.collection("todos").insertOne({ text });
  console.log(todo);
  revalidatePath("/");
}

export async function deleteTodo(id) {
  await db.collection("todos").findOneAndDelete({
    _id: ObjectId.createFromHexString(id),
  });
  revalidatePath("/");
}

export async function updateTodo(id,newText) {
    await db.collection("todos").findOneAndUpdate({_id: ObjectId.createFromHexString(id)},{$set: {text: newText}});
    revalidatePath("/");
}