#!/usr/bin/env python3
"""为骰子豆瓣影评技能生成单轮六骰结果并追加到 draft.md。"""

from __future__ import annotations

import argparse
import random
from pathlib import Path


DICE = [
    ("理论家", ["弗洛伊德", "齐泽克", "拉康", "弗洛伊德", "齐泽克", "拉康"]),
    ("电影讨论的是啥", ["欲望", "创伤", "记忆", "身份", "权力", "异化"]),
    ("分析对象", ["身体", "家庭", "空间", "时间", "消费", "语言"]),
    ("高级名词", ["他者", "凝视", "缺席", "能指", "规训", "主体"]),
    ("格局打开", ["现代性", "后现代性", "消费社会", "资本主义", "数字时代", "景观社会"]),
    (
        "给出结论",
        [
            "主体性的瓦解",
            "身份认同危机",
            "归属感消失",
            "现实边界模糊",
            "日常经验陌异化",
            "意义系统崩塌",
        ],
    ),
]

ROUND_NAMES = ["第一轮", "第二轮", "第三轮"]
DIE_NAMES = ["第一个骰子", "第二个骰子", "第三个骰子", "第四个骰子", "第五个骰子", "第六个骰子"]


def build_round_markdown(round_index: int, result: list[tuple[str, int, str]]) -> str:
    round_name = ROUND_NAMES[round_index - 1]
    compact = " ".join(
        f"{die_index}{word}" for die_index, (_, _, word) in enumerate(result, start=1)
    )
    lines = [f"## {round_name}骰子", ""]
    lines.append("### 投掷过程")
    lines.append("")
    for die_index, (_, _, word) in enumerate(result, start=1):
        lines.append(f"- {round_name}{DIE_NAMES[die_index - 1]}结果：{word}")
    lines.append("")
    lines.append("### 结果汇总")
    lines.append("")
    lines.append(f"- {round_name}骰子结果：{compact}")
    for die_index, (label, face, word) in enumerate(result, start=1):
        lines.append(f"- 骰子{die_index}（{label}）：{face} - {word}")
    lines.append("")
    lines.append("### 草稿句")
    lines.append("")
    lines.append("- [待补写] 根据本轮 6 个关键词写 3-6 句影评草稿。")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="生成单轮六骰影评关键词。")
    parser.add_argument("--round", type=int, choices=[1, 2, 3], required=True, help="轮次：1、2 或 3")
    parser.add_argument("--output", required=True, help="draft.md 输出路径")
    parser.add_argument("--seed", help="可选随机种子，便于复现")
    args = parser.parse_args()

    seed = f"{args.seed}:{args.round}" if args.seed is not None else None
    rng = random.Random(seed) if seed is not None else random.SystemRandom()
    result = []
    for label, faces in DICE:
        face = rng.randint(1, 6)
        result.append((label, face, faces[face - 1]))

    round_name = ROUND_NAMES[args.round - 1]
    for die_index, (_, _, word) in enumerate(result, start=1):
        print(f"{round_name}{DIE_NAMES[die_index - 1]}结果：{word}")
    compact = " ".join(
        f"{die_index}{word}" for die_index, (_, _, word) in enumerate(result, start=1)
    )
    print(f"{round_name}骰子结果：{compact}")

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    prefix = "# 骰子草稿\n\n" if not output.exists() or output.stat().st_size == 0 else ""
    with output.open("a", encoding="utf-8") as handle:
        handle.write(prefix)
        handle.write(build_round_markdown(args.round, result))
        handle.write("\n")
    print(f"已追加{round_name}骰子草稿：{output}")


if __name__ == "__main__":
    main()
