# References: Process Mining, Data Lineage, and Provenance

1. [Process Mining](https://en.wikipedia.org/wiki/Process_mining) - Wikipedia - Defines process mining, its three analysis modes (discovery, conformance checking, enhancement), and the role of event logs — directly foundational for this chapter's treatment of reconstructing actual enterprise process behavior from trace data.

2. [Data Lineage](https://en.wikipedia.org/wiki/Data_lineage) - Wikipedia - Explains upstream and downstream lineage concepts, column-level lineage, and lineage graph structures — directly matching this chapter's sections on tracing data values through transformation pipelines to sources and consumers.

3. [Event Log](https://en.wikipedia.org/wiki/Event_log) - Wikipedia - Covers event log structure including case IDs, activities, and timestamps — directly supporting this chapter's explanation of the three required fields and the IEEE XES standard format for process mining inputs.

4. *Designing Data-Intensive Applications* - Martin Kleppmann - O'Reilly Media - Chapter 11 covers event sourcing, CQRS, append-only logs, and change data capture in depth — providing the architectural detail that supports this chapter's treatment of these patterns as infrastructure for context graph temporal history.

5. *Fundamentals of Data Engineering* - Joe Reis, Matt Housley - O'Reilly Media - Chapters 7–9 cover data pipelines, transformation history, and data lineage tracking from source through transformation to serving — providing hands-on engineering context for this chapter's lineage and provenance sections.

6. [IEEE XES Standard for Event Logs](https://ieee-xes.org/) - IEEE Task Force on Process Mining - Official IEEE XES standard documentation defining the XML schema for portable event logs, the standard this chapter identifies as the bridge between raw operational logs and process mining analysis tools.

7. [OpenLineage Open Standard](https://openlineage.io/) - OpenLineage Project - Defines the open specification for lineage event metadata including run-level lineage, dataset inputs/outputs, and transformation records — directly relevant to this chapter's section on OpenLineage as the interoperability standard for lineage systems.

8. [Data Provenance](https://en.wikipedia.org/wiki/Data_provenance) - Wikipedia - Explains provenance concepts including custody chains, transformation history, and trust evaluation — foundational for this chapter's distinction between lineage (structural origin) and provenance (trustworthiness and accountability).

9. [Extract, Transform, Load](https://en.wikipedia.org/wiki/Extract,_transform,_load) - Wikipedia - Covers ETL pipeline patterns and their role in data transformation chains — providing background for this chapter's column-level lineage examples tracing values through multiple SQL transformation steps.

10. [Business Process Management](https://en.wikipedia.org/wiki/Business_process_management) - Wikipedia - Covers BPM frameworks, process model standards, and conformance analysis — supporting this chapter's treatment of conformance checking as the bridge between process mining findings and compliance requirements.
