import { useEffect, useMemo, useState } from 'react';
import { FixtureExplorationSource, type ExplorationSource } from '../adapter/explorationAdapter';
import { registry } from '../heuristics/registry'; import { runAudit } from '../runner/runAudit';
import type { AuditResult } from '../domain/types'; import { Filters, type FilterState } from './Filters';
import { SummaryBar } from './SummaryBar'; import { FindingsList } from './FindingsList';
export function AuditReportPage({ source }: { source?: ExplorationSource }) {
 const [result,setResult]=useState<AuditResult>(); const [filters,setFilters]=useState<FilterState>({exploration:'',severity:'',rule:'',query:''});
 const activeSource=useMemo(()=>source??new FixtureExplorationSource(),[source]);
 useEffect(()=>{runAudit(activeSource,registry).then(setResult)},[activeSource]);
 const visible=result?.findings.filter(f=>(!filters.exploration||f.explorationId===filters.exploration)&&(!filters.severity||f.severity===filters.severity)&&(!filters.rule||f.ruleId===filters.rule)&&(!filters.query||`${f.ruleId} ${f.evidence}`.toLowerCase().includes(filters.query.toLowerCase())))??[];
 if(!result)return <main><p>Loading audit report…</p></main>;
 if(result.run.status==='failed')return <main><h1>Accessibility audit report</h1><p role="alert">Audit failed: {result.run.errorMessage}</p></main>;
 return <main><h1>Accessibility audit report</h1><p className="disclaimer">Automated checks are advisory screening aids and do not certify WCAG conformance.</p><SummaryBar run={result.run} visible={visible.length}/><p aria-live="polite">{visible.length} findings shown.</p><Filters value={filters} onChange={setFilters} explorations={[...new Set(result.findings.map(x=>x.explorationId))]} rules={[...new Set(result.findings.map(x=>x.ruleId))]}/>{!result.findings.length?<p>No automated findings. {result.unscannedBlocks.length} unsupported blocks were not scanned.</p>:<><p>{result.unscannedBlocks.length} unsupported blocks were not scanned.</p><FindingsList findings={visible}/></>}</main>;
}
