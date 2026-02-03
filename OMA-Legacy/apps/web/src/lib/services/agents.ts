import { db, agents, agentTasks } from '@/lib/db';
import { sql } from 'drizzle-orm';

export class AgentsService {
  async getAgents(limit = 10, offset = 0) {
    return await db.select().from(agents).limit(limit).offset(offset);
  }

  async getAgentBySlug(slug: string) {
    const [agent] = await db
      .select()
      .from(agents)
      .where(sql`${agents.slug} = ${slug}`)
      .limit(1);
    return agent || null;
  }

  async createTask(data: {
    hireId: number;
    goal: string;
    budget: number;
    deadlineMinutes: number;
  }) {
    const [task] = await db
      .insert(agentTasks)
      .values({
        hireId: data.hireId,
        goal: data.goal,
        budget: data.budget,
        deadlineMinutes: data.deadlineMinutes,
        status: 'pending',
      })
      .returning();
    return task;
  }

  async updateTaskStatus(taskId: number, status: string, result?: unknown) {
    const [updatedTask] = await db
      .update(agentTasks)
      .set({
        status,
        result: result !== undefined ? JSON.stringify(result) : null,
        completedAt: status === 'completed' ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(sql`${agentTasks.id} = ${taskId}`)
      .returning();
    return updatedTask;
  }
}

export const agentsService = new AgentsService();
