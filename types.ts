
export interface EmployeeDailyStatus {
  employeeId: number;
  fullName: string;
  designationRole: string;
  department: string;
  reportingManager: string;
  employmentType: string;
  shiftType: string;
  workDate: string;
  workStatus: 'On Track' | 'Delayed';
  hoursWorked: number;
  overtimeHours: number;
  projectManagerName: string;
  leaveType: string;
  taskSummary: string;
  blockerReason: string;
  activeProjectsCount: number;
  projectNames: string;
  taskType: string;
  submissionTimestamp: string;
}

export type SubmissionHistory = EmployeeDailyStatus[];
