import { IColumn } from '../models/column'
import { ITask } from '../models/task'

export const mockTaskItems: ITask[] = [
  { code: 'TASK_1', name: 'TASK_1_NAME', column: 'COLUMN_A' },
  { code: 'TASK_2', name: 'TASK_2_NAME', column: 'COLUMN_A' },
  { code: 'TASK_3', name: 'TASK_3_NAME', column: 'COLUMN_A' },
  { code: 'TASK_4', name: 'TASK_1_NAME', column: 'COLUMN_B' },
  { code: 'TASK_5', name: 'TASK_2_NAME', column: 'COLUMN_B' },
  { code: 'TASK_6', name: 'TASK_3_NAME', column: 'COLUMN_C' },
  { code: 'TASK_7', name: 'TASK_1_NAME', column: 'COLUMN_D' },
  { code: 'TASK_8', name: 'TASK_2_NAME', column: 'COLUMN_D' },
  { code: 'TASK_9', name: 'TASK_3_NAME', column: 'COLUMN_A' }
]

export const mockColumns: IColumn[] = [
  { code: 'COLUMN_A', name: 'COLUMN_A_NAME', order: 0 },
  { code: 'COLUMN_B', name: 'COLUMN_B_NAME', order: 0 },
  { code: 'COLUMN_C', name: 'COLUMN_C_NAME', order: 0 },
  { code: 'COLUMN_D', name: 'COLUMN_D_NAME', order: 0 },
  { code: 'COLUMN_E', name: 'COLUMN_E_NAME', order: 0 }
]
