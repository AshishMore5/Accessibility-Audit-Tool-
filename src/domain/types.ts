export type Severity = 'violation'|'needs-review'|'info';
export type BlockType = 'heading'|'paragraph'|'image'|'link'|'form-field'|string;
export interface NormalizedBlock { explorationId:string; blockId:string; blockType:BlockType; text?:string; attributes?:Record<string,string|number|boolean|undefined>; renderedLocation?:string }
export interface Exploration { id:string; title:string; blocks: unknown[] }
export interface HeuristicDefinition { ruleId:string; title:string; description:string; applicability:BlockType[]; severity:Severity; detector:(block:NormalizedBlock,ctx:AuditContext)=>string|undefined; remediation:string; referenceUrl:string }
export interface AuditContext { previousHeadings:number[] }
export interface AuditFinding { findingId:string; explorationId:string; blockId:string; selector?:string; ruleId:string; severity:Severity; evidence:string; remediation:string; referenceUrl:string; runId:string }
export interface SummaryCounts { violation:number; 'needs-review':number; info:number; byRule:Record<string,number>; byExploration:Record<string,number> }
export interface AuditRun { runId:string; startedAt:string; status:'completed'|'completed-with-warnings'|'failed'; checkedExplorationCount:number; toolVersion:string; ruleSetVersion:string; summaryCounts:SummaryCounts; errorMessage?:string }
export interface AuditResult { run:AuditRun; findings:AuditFinding[]; unscannedBlocks:NormalizedBlock[]; warnings:string[] }
