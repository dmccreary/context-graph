# Decision Trace Schema



#	Concept	What it captures

216	Decision Trace Node Schema	The node label, required properties (trace ID, timestamp, outcome, justification text) and optional properties on a :DecisionTrace node
217	Decision Trace Edge Types	The typed directed edges that wire a trace into the graph — MADE_BY, AFFECTS, CITES_POLICY, REFERENCES_PRECEDENT, APPROVED_BY
218	Trace-to-Entity Relationship	How the AFFECTS edge links a :DecisionTrace node to the business entity (:Customer, :Account, :Order) the decision acted on
219	Actor Node Pattern	How the human or AI agent who made the decision is stored as a :Actor node and connected to the trace via a MADE_BY edge carrying a timestamp property
220	Policy Version Edge	How a CITES_POLICY edge points from the trace to a specific versioned :Policy node, preserving exactly which rule version was in force at decision time
221	Precedent Chain Pattern	How REFERENCES_PRECEDENT edges link traces to earlier traces, forming a traversable chain of searchable precedent through the graph