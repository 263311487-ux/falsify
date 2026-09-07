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
