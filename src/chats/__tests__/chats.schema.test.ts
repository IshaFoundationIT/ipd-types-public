import { describe, expect, test } from "bun:test";
import { GroupChatMessageSchema, GroupChatSchema } from "../chats.schema";

describe("GroupChatMessageSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    streamLanguage: "en",
    status: "active",
    role: "participant",
    isPinned: false,
    message: "hello",
    attachment: null,
    by: "user-1",
    userName: "Alice",
    chatId: "550e8400-e29b-41d4-a716-446655440001",
    serial: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid group chat message", () => {
    const result = GroupChatMessageSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe("hello");
    }
  });

  test("accepts attachment string", () => {
    const result = GroupChatMessageSchema.safeParse({
      ...valid,
      attachment: "https://example.com/x.png",
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = GroupChatMessageSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.path).toEqual(["id"]);
    }
  });

  test("rejects non-boolean isPinned", () => {
    const result = GroupChatMessageSchema.safeParse({ ...valid, isPinned: "true" });
    expect(result.success).toBe(false);
  });

  test("rejects non-number serial", () => {
    const result = GroupChatMessageSchema.safeParse({ ...valid, serial: "1" });
    expect(result.success).toBe(false);
  });

  test("rejects invalid createdAt", () => {
    const result = GroupChatMessageSchema.safeParse({ ...valid, createdAt: "bad" });
    expect(result.success).toBe(false);
  });
});

describe("GroupChatSchema", () => {
  const valid = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "General",
    enabled: true,
    creatorId: "550e8400-e29b-41d4-a716-446655440001",
    config: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  test("parses a valid group chat", () => {
    const result = GroupChatSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("accepts config object", () => {
    const result = GroupChatSchema.safeParse({ ...valid, config: { foo: "bar" } });
    expect(result.success).toBe(true);
  });

  test("rejects missing id", () => {
    const { id: _id, ...rest } = valid;
    const result = GroupChatSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test("rejects non-boolean enabled", () => {
    const result = GroupChatSchema.safeParse({ ...valid, enabled: "yes" });
    expect(result.success).toBe(false);
  });

  test("rejects non-string name", () => {
    const result = GroupChatSchema.safeParse({ ...valid, name: 42 });
    expect(result.success).toBe(false);
  });
});
