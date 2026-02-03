import { eq, getTableColumns, sql } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel, SQL } from 'drizzle-orm';
import type { AnyPgColumn, AnyPgTable } from 'drizzle-orm/pg-core';
import { db } from '@/lib/db';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface QueryOptions {
  where?: SQL | undefined;
  orderBy?: SQL | undefined;
  limit?: number;
  offset?: number;
}

export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  findOne(options: QueryOptions): Promise<T | null>;
  findMany(options: QueryOptions): Promise<T[]>;
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  count(options?: QueryOptions): Promise<number>;
  exists(id: number): Promise<boolean>;
}

export abstract class BaseRepository<TTable extends AnyPgTable> implements IRepository<
  InferSelectModel<TTable>
> {
  constructor(protected table: TTable) {}

  private get tableRef(): AnyPgTable {
    return this.table as unknown as AnyPgTable;
  }

  private get idColumn(): AnyPgColumn {
    return getTableColumns(this.table).id as unknown as AnyPgColumn;
  }

  protected getDb(): typeof db {
    return db;
  }

  async findById(id: number): Promise<InferSelectModel<TTable> | null> {
    const results = await this.getDb()
      .select()
      .from(this.tableRef)
      .where(eq(this.idColumn, id))
      .limit(1);

    return (results as unknown as InferSelectModel<TTable>[])[0] || null;
  }

  async findOne(options: QueryOptions): Promise<InferSelectModel<TTable> | null> {
    const baseQuery = this.getDb().select().from(this.tableRef).$dynamic();
    let query = baseQuery;

    if (options?.where) {
      query = query.where(options.where);
    }

    if (options?.orderBy) {
      query = query.orderBy(options.orderBy);
    }

    query = query.limit(1);

    const results = await query;
    return (results as unknown as InferSelectModel<TTable>[])[0] || null;
  }

  async findMany(options: QueryOptions): Promise<InferSelectModel<TTable>[]> {
    const baseQuery = this.getDb().select().from(this.tableRef).$dynamic();
    let query = baseQuery;

    if (options?.where) {
      query = query.where(options.where);
    }

    if (options?.orderBy) {
      query = query.orderBy(options.orderBy);
    }

    const limit = options?.limit ?? 50;
    const offset = options?.offset ?? 0;

    query = query.limit(limit).offset(offset);

    return query as unknown as InferSelectModel<TTable>[];
  }

  async findAll(): Promise<InferSelectModel<TTable>[]> {
    return this.getDb().select().from(this.tableRef) as unknown as InferSelectModel<TTable>[];
  }

  async create(data: Partial<InferSelectModel<TTable>>): Promise<InferSelectModel<TTable>> {
    const results = (await this.getDb()
      .insert(this.tableRef)
      .values([data as unknown as InferInsertModel<TTable>])
      .returning()) as unknown as InferSelectModel<TTable>[];

    return results[0] as InferSelectModel<TTable>;
  }

  async update(
    id: number,
    data: Partial<InferSelectModel<TTable>>
  ): Promise<InferSelectModel<TTable> | null> {
    const results = (await this.getDb()
      .update(this.tableRef)
      .set(data as unknown as Partial<InferInsertModel<TTable>>)
      .where(eq(this.idColumn, id))
      .returning()) as unknown as InferSelectModel<TTable>[];

    return (results[0] as InferSelectModel<TTable>) || null;
  }

  async delete(id: number): Promise<boolean> {
    const results = (await this.getDb()
      .delete(this.tableRef)
      .where(eq(this.idColumn, id))
      .returning()) as unknown as unknown[];

    return results.length > 0;
  }

  async count(options?: QueryOptions): Promise<number> {
    const baseQuery = this.getDb()
      .select({ count: sql<number>`count(*)` })
      .from(this.tableRef)
      .$dynamic();
    let query = baseQuery;

    if (options?.where) {
      query = query.where(options.where);
    }

    const results = await query;
    return Number(results[0]?.count ?? 0);
  }

  async exists(id: number): Promise<boolean> {
    const result = await this.getDb()
      .select({ count: sql<number>`count(*)` })
      .from(this.tableRef)
      .where(eq(this.idColumn, id));

    return (result[0]?.count ?? 0) > 0;
  }

  protected getPaginationOptions(options: PaginationOptions): QueryOptions {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.min(100, options.limit ?? 20);
    const offset = options.offset ?? (page - 1) * limit;

    return { limit, offset };
  }
}
