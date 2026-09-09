# CLI dogfood · 真实事故现场（2026-09-07）

**场景**：home-assistant/core#181420 — Aladdin Connect 集成"自发创建门实体"事故（2026-09-06 起，62+ 评论，涉及用户安全警报触发）。

**社区里的自信结论**（原始评论摘录）：
- *"The doors it was displaying were obviously other users' doors."*
- *"They definitely seem to be other people's doors."*
- *"Definitely seems like an auth/API issue. each time [re-adding the integration] it grabs a different account."*

**falsify CLI 现场跑**：
```bash
npx falsify-skill "HA 里出现的门显然都是别的用户的，这肯定是认证或 API 串号问题。"
```
输出：红旗词（显然/肯定）→ 路由 Depth → 铁律改写 → 五阶段缺失 5/5 → 改进模板（备选解释 / 可测预测 / 判死条件）。

**协议逼出的关键区分（模板未给出答案，但给出验证路径）**：
1. 「抓到别人的账号」 vs 「抓到自己的账号但 API 返回了别人的门」是**两个不同假设**——前者是 HA 凭据/token 串了，后者是 Aladdin 服务端多租户数据泄漏。评论里两种说法混在一起，没人先做这个区分。
2. 判死实验：用 Aladdin 官方 API（脱离 HA）直接请求自己账号，若返回仍含陌生门 → 服务端泄漏；若干净 → HA 集成侧问题。区分成本最低。
3. 观察性事实（门数 3→6→8→9→15 递增 + 含他人地址命名）支持"服务端返回了跨租户数据集"方向，但**观察本身不等于确诊**——需要 2 的对照。

**ground truth 状态**：issue 仍在调查中（2026-09-07），无官方定论。本案例展示的不是"falsify 猜中了"，而是**它在多人锁死结论时保持假设开放并指向最低成本判死实验**。

*注：CLI 是模板化启发式，非 LLM 判断；完整协议见 SKILL.md。*

**跟进（2026-09-07）**：以上区分方法已作为评论发到该 issue（[comment](https://github.com/home-assistant/core/issues/181420#issuecomment-5564897751)），帮助 60+ 受害者用一步对照实验分离"HA 凭据串号"与"Aladdin 服务端跨租户泄漏"两个假设——非推广，纯排查帮助，文末透明披露来源。

## Ground truth 闭环（2026-09-08，官方证实）

Issue 于 9/8 关闭（71 条评论）。用户 cefoster0 转述 Genie（Aladdin 母公司）确认：

> They've confirmed they've rolled back that change, which they suspect caused the incorrect door lists. Genie is still investigating. The extent of the data exposure and any impact on door commands is still unconfirmed.

**假设裁决（对照 falsify 的区分）**：
- **H2（服务端变更导致跨租户数据泄漏）幸存** ✅ —— Genie 回滚了一个服务端变更并怀疑它就是原因；reload 一次即移除 425 台设备 / ~823 实体，与"服务端数据集被污染"一致。
- **H1（HA 凭据/集成串号）被排除** ❌ —— 用户在评论中补充："the integration uses OAuth"，且 reload 即恢复，指向服务端而非本地凭据。
- **剩余未知（协议要求的诚实收束）**：数据暴露程度与是否有人能控制他人门，官方"still unconfirmed"。协议不把"方向正确"夸大成"完全证实"。

**这是 falsify 协议在真实事故上的完整闭环**：多人锁死"肯定是认证问题 / 显然是别人的门"时，协议保持两个假设开放并指向一步判死实验 → 官方后续证实服务端假设幸存。方法未给出答案，但给出了最短的验证路径。
