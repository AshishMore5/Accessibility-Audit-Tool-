import data from '../fixtures/explorations.json'; import type { Exploration } from '../domain/types';
export interface ExplorationSource { listExplorations(): Promise<Exploration[]> }
export class FixtureExplorationSource implements ExplorationSource { async listExplorations(){ return data as Exploration[] } }
export class FailingSource implements ExplorationSource { constructor(private message='Could not load explorations'){} async listExplorations():Promise<Exploration[]>{ throw new Error(this.message) } }
