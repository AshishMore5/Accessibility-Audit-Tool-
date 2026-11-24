import type { AuditFinding, SummaryCounts } from '../domain/types';
export const stableFindingId=(e:string,b:string,r:string)=>`${e}:${b}:${r}`;
export function normalizeFindings(findings:AuditFinding[]){ const seen=new Map<string,AuditFinding>(); findings.forEach(f=>seen.set(f.findingId,f)); return [...seen.values()] }
export function counts(findings:AuditFinding[]):SummaryCounts { const result:SummaryCounts={violation:0,'needs-review':0,info:0,byRule:{},byExploration:{}}; findings.forEach(f=>{result[f.severity]++;result.byRule[f.ruleId]=(result.byRule[f.ruleId]??0)+1;result.byExploration[f.explorationId]=(result.byExploration[f.explorationId]??0)+1});return result }
