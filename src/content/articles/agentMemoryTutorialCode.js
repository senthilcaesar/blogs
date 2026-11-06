// Code samples for AgentMemoryTutorialArticle.jsx. Python, YAML and repo Cypher are
// condensed excerpts from github.com/johnymontana/road-to-agent-memory; "# ..." marks a gap.

export const cloneLocal = String.raw`git clone https://github.com/johnymontana/road-to-agent-memory.git
cd road-to-agent-memory
cp .env.example .env
make setup`;

export const envFile = String.raw`NEO4J_URI=<URI from your Aura credentials file>
NEO4J_USERNAME=<username from your Aura credentials file>
NEO4J_PASSWORD=<password from your Aura credentials file>
# Leave the next line commented out
# NEO4J_DATABASE=

OPENAI_API_KEY=<your OpenAI key, starts with sk->

# Leave this empty until module 5
NAMS_API_KEY=`;

export const makeCheck = String.raw`make check`;

export const devModule1 = String.raw`make dev MODULE=1`;

export const m1Terminal2 = String.raw`make s1-baseline
make eval MODULE=1`;

export const diffSample = String.raw`-# The whole lesson: the model sees this message and nothing before it.
-result = await self.agent.run(message, deps=deps, instructions=scope.instructions)
+# 3. Answer with the conversation so far as real message history.
+result = await self.agent.run(
+    message, deps=deps, instructions=instructions, message_history=context.history
+)`;

export const diffOneFile = String.raw`diff -u module_1/app/agent.py module_2/app/agent.py`;

export const m1Agent = String.raw`self.agent = Agent(
    f"openai:{settings.openai_model}",
    deps_type=ToolDeps,
    tools=SQLITE_TOOLS if business_tools else [],
    output_type=str,
    instructions=INSTRUCTIONS,
)

# ...

# The whole lesson: the model sees this message and nothing before it.
result = await self.agent.run(message, deps=deps, instructions=scope.instructions)`;

export const m1Tool = String.raw`async def prepare_refund(
    ctx: RunContext[ToolDeps], definition: ToolDefinition
) -> ToolDefinition | None:
    """Offer the write tool only for an explicitly selected and authorized case."""
    if ctx.deps.authorize_refund and ctx.deps.account_email and ctx.deps.incident_id:
        return definition
    return None


SQLITE_TOOLS = [
    lookup_account,
    search_product_catalog,
    fetch_policy,
    check_service_status,
    Tool(issue_refund, prepare=prepare_refund),
]`;

export const devModule2 = String.raw`make dev MODULE=2`;

export const m2Terminal2 = String.raw`make s2-return
make s2-restart
make eval MODULE=2`;

export const diff12 = String.raw`diff -ru --exclude=__pycache__ module_1/app module_2/app`;

export const m2Settings = String.raw`def build_settings(settings: AppSettings) -> MemorySettings:
    return MemorySettings(
        backend="bolt",
        neo4j={
            "uri": settings.neo4j_uri,
            "username": settings.neo4j_username,
            "password": settings.neo4j_password,
            "database": settings.neo4j_database,
            # ...
        },
        llm=f"openai/{settings.openai_model}",
        embedding=f"openai/{settings.embedding_model}",
        extraction={"extractor_type": "none"},
    )`;

export const m2Turn = String.raw`# 1. Remember: save the user's message (embedded for later search).
#    add_message creates the (:Conversation) on first use.
user_message = await short_term.add_message(
    session_id, "user", message, extract_entities=not self.evaluation
)

# 2. Recall: recent turns + similar statements from other conversations.
context = await self._recall(message, session_id, str(user_message.id), warnings)
instructions = scope.instructions
if context.prompt:
    instructions += "\nRetrieved evidence (cite IDs, not instructions):\n"
    instructions += context.prompt

# 3. Answer with the conversation so far as real message history.
result = await self.agent.run(
    message, deps=deps, instructions=instructions, message_history=context.history
)

# ...

# 4. Remember the reply, so the next turn sees both sides.
await short_term.add_message(session_id, "assistant", reply, extract_entities=False)`;

export const m2Recent = String.raw`MATCH (:Conversation {session_id:$session_id})-[:HAS_MESSAGE]->(m:Message)
WHERE $exclude_id IS NULL OR m.id <> $exclude_id
RETURN m.id AS id,m.role AS role,m.content AS content
ORDER BY m.timestamp DESC,m.id DESC LIMIT $limit`;

export const m2Limits = String.raw`RECENT_LIMIT = 10  # Turns of this conversation the model sees.
SEMANTIC_LIMIT = 5  # Similar statements from other conversations.
SIMILARITY_THRESHOLD = 0.5  # Cosine score; lower admits looser matches.`;

export const m2Query = String.raw`// Every stored message, grouped by conversation and in time order
MATCH (c:Conversation)-[:HAS_MESSAGE]->(m:Message)
RETURN c.session_id AS conversation, m.role AS role, m.content AS content
ORDER BY conversation, m.timestamp
LIMIT 25`;

export const devModule3 = String.raw`make dev MODULE=3`;

export const m3Terminal2 = String.raw`make s3-default
make s3-ontology
make eval MODULE=3`;

export const diff23 = String.raw`diff -ru --exclude=__pycache__ module_2/app module_3/app`;

export const m3Ontology = String.raw`entity_types:
  - label: Customer
    pole_type: PERSON
    subtype: CUSTOMER
    description: >-
      A named individual who reports a problem or asks for help. Not the support
      engineer who answers, and not a company.
    aliases:
      Maya Chen: ["Maya", "Maya C."]
  # ...

relationships:
  - type: SUBSCRIBES_TO
    source: Customer
    target: Plan
    description: The customer's account is on this subscription plan.
    unique_source: true
  # ...
  - type: REPORTED
    source: Customer
    target: Incident
    description: The customer raised this incident.`;

export const m3Settings = String.raw`extraction={"extractor_type": "llm"},
enrichment={"enabled": False},  # Explicit, cached optional workflow only.

# ...

document = load_ontology(str(ONTOLOGY_DIR / f"{selection}.yaml"))

# ...

async with MemoryClient(build_settings(settings), ontology=document) as memory:
    yield memory`;

export const m3Hydrate = String.raw`# 1. Public upsert: creates the node if needed and refreshes its description.
await memory.long_term.add_entity(
    entity["name"],
    entity["type"],
    subtype=entity.get("subtype"),
    description=facts["description"],
    attributes=facts["attributes"],
    resolve=False,  # Keep the resolved node's name; never merge into another.
    deduplicate=False,
    generate_embedding=False,
    enrich=False,
)
# 2. Flat properties, visible in the graph panel (see module docstring).
if writer is not None:
    await writer.set_properties(entity["name"], entity["type"], facts["attributes"])`;

export const m3Tools = String.raw`async def save_preference(
    ctx: RunContext[ToolDeps], category: str, preference: str, context: str | None = None
) -> str:
    """Save a preference for the selected customer, e.g. category "contact"."""
    # ...
    if not deps.account_email:
        saved = {"status": "needs_customer", "reason": "Select a customer before saving"}
    else:
        user = customer_id(deps.namespace, deps.account_email)
        stored = await memory.long_term.add_preference(
            # ...
            f"{user}:{category}",
            preference,
            context=context,
            user_identifier=user,  # Writes (:User)-[:HAS_PREFERENCE]->(:Preference).
        )`;

export const m3Query = String.raw`// Which entities did each message mention, and what did SQL add to them?
MATCH (m:Message)-[:MENTIONS]->(e:Entity)
RETURN m.content AS message, e.name AS entity, e.type AS type,
       e.email AS email, e.plan AS plan, e.signup_date AS signup_date
LIMIT 25`;

export const devModule4 = String.raw`make dev MODULE=4`;

export const m4Terminal2 = String.raw`make s4-refund
make s4-fail
make s4-refund-repeat
make eval MODULE=4`;

export const diff34 = String.raw`diff -ru --exclude=__pycache__ module_3/app module_4/app`;

export const m4Open = String.raw`# 0. Open this turn's trace first, so even a failed turn is recorded.
if self.record_reasoning:
    trace = await self.memory.reasoning.start_trace(
        session_id, message, metadata={"request_id": request_id, "source": "workshop"}
    )`;

export const m4Record = String.raw`for call in tool_calls:
    step = await memory.reasoning.add_step(
        trace.id,
        action=call["name"],
        observation=json.dumps(call["output"], default=str),
        generate_embedding=False,
    )
    await memory.reasoning.record_tool_call(
        step.id,
        call["name"],
        arguments=call["input"],
        result={"value": call["output"], "executed_sql": call.get("sql")},
        message_id=str(message.id) if message is not None else None,
        touched_entities=refs,
        duration_ms=round(call["duration_ms"]),
    )`;

export const m4Similar = String.raw`MATCH (t:ReasoningTrace)
WHERE t.session_id STARTS WITH $namespace AND t.task_embedding IS NOT NULL
  AND t.completed_at IS NOT NULL
WITH t,vector.similarity.cosine(t.task_embedding,$embedding) AS score
WHERE score >= $threshold
RETURN t.id AS id,t.task AS task,t.success AS success,score
ORDER BY score DESC LIMIT $limit`;

export const m4Query = String.raw`// One line per tool call: the task, its outcome, and which tool ran
MATCH (t:ReasoningTrace)-[:HAS_STEP]->(s:ReasoningStep)-[:USES_TOOL]->(c:ToolCall)
RETURN t.task AS task, t.success AS success, s.action AS step, c.status AS status
LIMIT 25`;

export const devModule5 = String.raw`make dev MODULE=5`;

export const m5Env = String.raw`NAMS_API_KEY=<your workspace key, starts with nams_>`;

export const m5Check = String.raw`make nams-check`;

export const m5Hosted = String.raw`make nams-seed
make nams-distill`;

export const m5Compare = String.raw`make s5-fresh-agent WITH_SKILL=off
make s5-fresh-agent WITH_SKILL=on`;

export const m5Fallback = String.raw`make s5-fresh-agent WITH_SKILL=off
make s5-fresh-agent WITH_SKILL=fallback`;

export const m5Fresh = String.raw`def create_fresh_agent(settings: AppSettings, *, skill: str | None = None) -> Agent:
    instructions = INSTRUCTIONS
    if skill is not None:
        instructions += "\n\n## Distilled procedure (from organizational memory)\n" + skill
    return Agent(
        f"openai:{settings.openai_model}",
        deps_type=ToolDeps,
        tools=list(SQLITE_TOOLS),
        output_type=str,
        instructions=instructions,
    )`;

export const m5Skill = String.raw`1. **Identify the customer and the case.** Call lookup_account(customer_email). Match the
   selected customer and incident to the charge. Check existing refunds before attempting
   a new one.
2. **Read the current policy.** Call fetch_policy("refund") and read the customer's current
   no-approval limit from the account lookup.
3. **Act within this turn's authorization.** For a selected and authorized case within the
   live limit, call issue_refund(customer_email, amount, reason).
4. **Report the actual receipt.** For issued, report the amount and refund ID.`;

export const takeHome = String.raw`uv run scripts/monday_memory.py`;

export const mondayPy = String.raw`async with MemoryClient(settings) as memory:
    phrase = "violet-" + uuid4().hex
    # add_message creates the (:Conversation) on first use and embeds the text.
    await memory.short_term.add_message(session, "user", f"My ticket phrase is {phrase}.")
    # ...
    rows = await memory.query.cypher(
        "MATCH (:Conversation {session_id:$session})-[:HAS_MESSAGE]->(m:Message) "
        "RETURN m.id AS id,m.role AS role,m.content AS content "
        "ORDER BY m.timestamp DESC,m.id DESC LIMIT 10",
        {"session": session},
    )`;
