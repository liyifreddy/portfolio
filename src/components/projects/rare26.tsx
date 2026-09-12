"use client";

import React from "react";
import { Project } from "@/components/project-card";
import { LinkPreview } from "@/components/ui/link-preview";

/**
 * RARE26 — Early Barrett's Neoplasia Detection Challenge (EndoVis, MICCAI 2026)
 *
 * Content source: project doc `11_RARE26_材料弹药库` §1.1 / §1.2 / §三 and `00_事实档` §4.6.
 * Every number here is quoted from those documents. Do not add, round or re-derive numbers.
 *
 * Hard constraints (see `claude/34_个人主页_RARE26条目.md` §六):
 *  - no rank, no leaderboard score (0.0152 / 0.7700)
 *  - no rendered PDF link
 *  - "early neoplasia", never "precancerous lesion"
 *  - never "I trained a model" without the frozen-backbone qualifier
 *  - no clinical-use implication
 */
export const rare26Project: Project = {
  id: "rare26-frozen-readout",
  title: "RARE26 — Early Barrett's Neoplasia Detection Challenge",
  organization: "EndoVis · MICCAI 2026 — solo entrant",
  timeframe: "July – September 2026",
  supervisor: "Solo entrant · code and technical report public under MIT",
  description:
    "A solo challenge entry in medical imaging: a frozen backbone, a 4096-parameter read-out head, and 1835 pre-registered cross-center comparisons — 77% of which resolved nothing, and are published anyway.",
  highlights: [
    "Asked whether the usual upgrades buy anything at this data scale, and measured the answer: with 158 positive training images, 11 pretrained backbones, 7 read-out heads, layer choice, one-class versus discriminant scoring, multiple-instance pooling, fusion, test-time augmentation and four robustness modules — 1835 paired cross-center comparisons in all",
    "None was detectably better than the delivered configuration in both cross-center directions; 1415 of the 1835 comparisons (77%) established no improvement, and every one is published with the rule that classified it",
    "Made that negative credible: the adoption rule was written before each grid ran — both directions, paired bootstrap, a practical-significance threshold measured from a power curve rather than chosen, and never the argmax of a grid, since a nested search showed the inner loop's best cell was detectably worse on the fold it never saw in 9 of 22 cases",
    "The one change that survived scores each of the 49 spatial positions separately and pools the top 2% instead of averaging the feature map first, because averaging dilutes a small lesion — cross-center it cut residual false positives at 90% recall by 66.9% and 89.3%",
    "Kept the encoder frozen by design, not by budget: a provider-pretrained GI-endoscopy ResNet-50 used unchanged, with only a 4096-parameter closed-form shrinkage discriminant fitted on its 7×7 feature map — which is what made 1835 closed-form comparisons affordable on one laptop GPU",
    "Delivered as a CPU-only container: 26.0 s end to end per 384-frame case on the evaluation hardware against a 600 s budget, reproduced offline with zero rank changes",
  ],
  skills: [
    "PyTorch",
    "Frozen Pretrained Backbones",
    "ResNet-50 / DINOv1",
    "Shrinkage Gaussian Discriminant",
    "Grouped Cross-Validation",
    "Paired Bootstrap",
    "Pre-Registered Evaluation Protocol",
    "Nested Cross-Validation",
    "Power Analysis",
    "Label-Noise Sensitivity",
    "Group-Leakage Control",
    "Docker (CPU-only inference)",
    "Reproducibility",
  ],
  image: "/projects/rare26.webp",
  category: "research",
  content: (
    <div className="text-[#333333]">
      <h3 className="text-xl font-bold mb-3">The Task, and What Decided Everything Else</h3>
      <p className="mb-4 leading-relaxed">
        Detect <strong>early neoplasia</strong> in Barrett&apos;s esophagus from
        endoscopy frames, at low prevalence. The ranking metric is not AUC — it is{" "}
        <strong>positive predictive value at 90% recall, with prevalence fixed at 1%</strong>.
        The public training set has 3,095 images, 158 of them positive, from two
        Dutch centres. I had one laptop GPU and no team.
      </p>
      <p className="mb-4 leading-relaxed">
        I did not fine-tune the backbone. I froze a ResNet-50 pretrained on five
        million GI-endoscopy images and put all of the work in the layer above it:
        a closed-form shrinkage discriminant, <strong>4,096 parameters, 16 KB</strong>.
        That was not a concession to compute. Because the backbone never changes,
        every ablation collapses into one closed-form computation on cached
        features — and that is what made <strong>1,835 comparisons</strong>, each
        run in both cross-centre directions, each with a paired bootstrap,
        possible at all.
      </p>
      <p className="mb-6 leading-relaxed">
        The adoption rule was written before the grids ran. 1,415 of those 1,835
        comparisons (77%) established no improvement, and I published them too.
        Exactly one change passed.
      </p>

      <h3 className="text-xl font-bold mb-3">Build the Ruler Before the Model</h3>
      <p className="mb-4 leading-relaxed">
        The first thing I did was not pick a model. It was to write the ranking
        metric out as an identity —{" "}
        <code className="px-1 rounded bg-[#C19A49]/15">
          PPV = 0.9π / [0.9π + (1 − spec)(1 − π)]
        </code>
        , with π = 0.01 — and three things follow immediately.
      </p>
      <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
        <li>
          PPV is a <strong>strictly increasing function of specificity</strong>,
          so the two can never point in opposite directions. They can only differ
          in noise.
        </li>
        <li>
          The threshold at 90% recall is a <strong>single order statistic</strong>{" "}
          — the (n<sub>pos</sub> − ⌈0.9·n<sub>pos</sub>⌉ + 1)-th lowest positive
          score. That is the 7th lowest when the test side holds 61 positives, the
          10th when it holds 97.
        </li>
        <li>
          Once that threshold is fixed, at 1% prevalence the value is decided
          entirely by <strong>how many negatives sit above it</strong> — by the far
          tail of the negative distribution, not by the bulk of the scores.
        </li>
      </ul>
      <p className="mb-4 leading-relaxed">
        Measured rather than argued: in one cross-centre direction, specificity at
        90% recall is decided by <strong>6 false positives out of 719 negatives</strong>.
        One image is worth 0.0014 of specificity.
      </p>
      <p className="mb-6 leading-relaxed">
        A useful corollary fell out of the same identity: the metric is invariant
        to any monotone transform, so the logistic squash at the end of the
        pipeline <em>cannot</em> change the score. That became one of the
        self-checks rather than something to worry about.
      </p>

      <h3 className="text-xl font-bold mb-3">
        The Scoring Metric and Its Usual Proxy Disagree — Measured Both Ways
      </h3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse min-w-[400px]">
          <thead>
            <tr className="border-b-2 border-[#C19A49]">
              <th className="py-2 px-4 font-semibold">Perturbation</th>
              <th className="py-2 px-4 font-semibold text-right">
                Ranking metric
              </th>
              <th className="py-2 px-4 font-semibold text-right">AUROC</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 px-4">5% of training labels flipped</td>
              <td className="py-2 px-4 text-right">−30.5% to −46.0%</td>
              <td className="py-2 px-4 text-right">−0.3% to −2.5%</td>
            </tr>
            <tr className="border-b border-gray-200 bg-[#fbf3e5]/50">
              <td className="py-2 px-4">
                One component change (equal-weight multi-scale pooling)
              </td>
              <td className="py-2 px-4 text-right font-medium">
                0.5214 → 0.1612 (−69%)
              </td>
              <td className="py-2 px-4 text-right">
                −0.0048 (not detectable)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4 leading-relaxed">
        The first row is a ratio of about <strong>19× to 106×</strong>, measured
        across four curves — two cross-centre directions by two flip models. The
        second row is the more convincing half, because it counts against me: a
        change that AUROC calls a non-event takes 69% off the metric that actually
        scores the submission, and specificity at 90% sensitivity from 0.9917 to
        0.9527.
      </p>
      <p className="mb-4 leading-relaxed">
        At scale: in the largest grid, <strong>86 of 474 cells</strong> have the
        two metrics pointing in incompatible directions — roughly one comparison
        in five. A protocol reporting only one ruler would present about a fifth
        of its comparisons as settled when they are not.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The half that has to be said with it:</strong> the ranking
        metric&apos;s own noise is large enough that it cannot referee either. All
        six of those paired intervals contain zero, and the baseline&apos;s own
        interval is [0.1199, 0.7657]. Neither ruler is safe — AUROC hides
        threshold damage, the ranking metric is too noisy to see it — which is why
        both are reported side by side throughout. For context, Menon et al.
        (ICML 2015) proved that under class-conditional label noise the corrupted
        AUC is a positive affine transform of the clean AUC, leaving any
        scorer&apos;s induced ranking unchanged; they also marked the boundary,
        that metrics optimised by thresholding class probabilities need the noise
        rate or base rate to place the threshold. Precision at fixed recall is
        exactly such a metric, and they did not analyse it. This measures the
        magnitude.
      </p>

      <h3 className="text-xl font-bold mb-3">The One Change That Survived</h3>
      <p className="mb-4 leading-relaxed">
        Do not average the 49 spatial positions of the feature map before scoring.
        Score each position separately and pool the top 2%. When the lesion is
        small, averaging first dilutes it into 48 positions of healthy tissue.
        Cross-centre it cut residual false positives at 90% recall by{" "}
        <strong>66.9% and 89.3%</strong>, and on an independent dataset the
        highest-scoring cell fell inside the five-expert consensus lesion{" "}
        <strong>78.0%</strong> of the time against 16.7% by chance.
      </p>
      <p className="mb-6 leading-relaxed">
        One detail I would rather state than be asked: in one of the two
        directions this change is a detectable improvement that{" "}
        <strong>misses my own practical-significance threshold by 0.0002</strong>{" "}
        on the AUROC scale (+0.0163 against 0.0165) — while on the metric that
        actually scores the submission, that same direction goes up fivefold
        (0.1045 → 0.5214). I adopted it because the pre-registered rule asks for a
        detectable improvement in both directions, not for clearing an AUROC
        threshold. That is the argument of the whole report, happening to my own
        result.
      </p>

      <h3 className="text-xl font-bold mb-3">The Errors Are Published Too</h3>
      <p className="mb-4 leading-relaxed">
        The repository carries a page called{" "}
        <code className="px-1 rounded bg-[#C19A49]/15">
          docs/05_what_we_got_wrong.md
        </code>
        . It lists the errors that change how someone should read the numbers —
        not a changelog. Three of them:
      </p>
      <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
        <li>
          <strong>
            The grouping script in the repository does not reproduce the grouping
            the results were computed with, and nobody had checked.
          </strong>{" "}
          Two code paths resize images differently, which put 34 of the 3,095
          images (1.1%) into different groups. Before touching the script I re-ran
          the one conclusion the project depends on under both groupings; it holds
          under both. Then I fixed the script.
        </li>
        <li>
          <strong>
            65 comparisons in the largest grid are a configuration against itself.
          </strong>{" "}
          Two options on the pooling axis reduce to the baseline operator on a 7×7
          grid, so the paired difference is identically zero. All 65 landed in
          &ldquo;could not separate&rdquo;. I did not change the published numbers,
          because applying a rule inconsistently across families is worse than
          saying so out loud.
        </li>
        <li>
          <strong>
            Section 1 of the report stated the threshold&apos;s ordinal position
            backwards, and had done since the day it was written.
          </strong>{" "}
          No number is affected — the scorer reads an interpolated
          precision–recall curve and never indexes the sorted positives. That is
          also exactly why no gate caught it: every gate in this repository
          compares one computed quantity against another, and this was a sentence
          with no computed quantity behind it.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        One more that belongs here rather than in a footnote: the 49 positions of
        the feature map are <strong>not independent</strong>. Treating them as
        samples when estimating the covariance is a deliberate part of the design,
        but any argument of the form &ldquo;the effective sample size is 49 ×
        n&rdquo; is wrong, by roughly a factor of five.
      </p>

      <h3 className="text-xl font-bold mb-3">What Was Delivered</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse min-w-[400px]">
          <thead>
            <tr className="border-b-2 border-[#C19A49]">
              <th className="py-2 px-4 font-semibold">Item</th>
              <th className="py-2 px-4 font-semibold">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 px-4">Learned parameters</td>
              <td className="py-2 px-4">
                4,096 (one 2048-d discriminant + one 2048-d mean), ≈ 16 KB,
                closed form — no backpropagation, no epochs, no loss curve
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 px-4">Backbone</td>
              <td className="py-2 px-4">
                ResNet-50, GastroNet-5M DINOv1 weights, provider-pretrained and
                frozen throughout — not one layer fine-tuned
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 px-4">Read-out</td>
              <td className="py-2 px-4">
                layer4 map, 7×7×2048, no global average pooling; signed power
                transform, then the top 2% of the 49 positions
              </td>
            </tr>
            <tr className="border-b border-gray-200 bg-[#fbf3e5]/50">
              <td className="py-2 px-4">Submission</td>
              <td className="py-2 px-4">
                CPU-only container — one case is 384 frames with a 600 s budget;
                26.0 s end to end on the evaluation hardware (2 vCPU, 16 GB, no
                GPU), 15.8 s on a laptop CPU, peak memory 2–3 GB
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 px-4">Reproduction</td>
              <td className="py-2 px-4">
                packaged image reloaded and run with the network disabled, then
                compared frame by frame against the offline computation: maximum
                per-image difference 4.917e-07, <strong>zero rank changes</strong>,
                Spearman 1.0000
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mb-3">What This Is Not</h3>
      <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
        <li>
          Research software. It is <strong>not a medical device</strong>, it has
          not been clinically validated, and it has not been tested in any
          clinical workflow.
        </li>
        <li>
          The backbone weights are provider-pretrained and covered by a separate
          data use agreement that forbids redistribution. The repository contains
          no weights, only the path to obtain them, and no challenge images are
          redistributed.
        </li>
        <li>
          Every interval reported here is in-domain. The training set is two
          retrospective Dutch centres; the challenge evaluates on twelve centres
          including prospective collection.{" "}
          <strong>
            The shift we can validate is not the shift we are evaluated on.
          </strong>
        </li>
        <li>
          The final ranking is announced at MICCAI 2026 in October. Nothing on
          this page is a final result.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        As far as I know, no public code or weights existed in this area before —
        the eleven teams in the previous edition&apos;s challenge paper list no
        repository between them. Publishing was also a condition of entry: the
        challenge rules require every participant to release their code under the
        MIT licence.
      </p>

      <h3 className="text-xl font-bold mb-3">Code, Report and Figures</h3>
      <p className="mb-4 leading-relaxed">
        Everything below is public under the MIT licence in the{" "}
        <LinkPreview
          url="https://github.com/liyifreddy/rare26-frozen-readout"
          className="text-[#FD6142] hover:underline"
        >
          project repository
        </LinkPreview>
        , together with the full technical report.
      </p>
      <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
        <li>
          <LinkPreview
            url="https://github.com/liyifreddy/rare26-frozen-readout/blob/main/docs/00_evaluation_protocol.md"
            className="text-[#FD6142] hover:underline"
          >
            Evaluation protocol
          </LinkPreview>{" "}
          — the comparison rules, the seven verdict classes, the label-noise
          curves and the negative-tail figure.
        </li>
        <li>
          <LinkPreview
            url="https://github.com/liyifreddy/rare26-frozen-readout/blob/main/docs/05_what_we_got_wrong.md"
            className="text-[#FD6142] hover:underline"
          >
            What we got wrong
          </LinkPreview>{" "}
          — the published error list.
        </li>
        <li>
          <LinkPreview
            url="https://github.com/liyifreddy/rare26-frozen-readout/blob/main/docs/06_domain_shift_attribution.md"
            className="text-[#FD6142] hover:underline"
          >
            Domain-shift attribution
          </LinkPreview>{" "}
          — where a number stops being entitled to answer the question, and the
          AUROC-to-PPV correspondence curve.
        </li>
        <li>
          <LinkPreview
            url="https://github.com/liyifreddy/rare26-frozen-readout/blob/main/docs/07_verdict_counts.md"
            className="text-[#FD6142] hover:underline"
          >
            Verdict counts
          </LinkPreview>{" "}
          — all 1,835 comparisons, counted family by family.
        </li>
        <li>
          <LinkPreview
            url="https://rare26.grand-challenge.org/"
            className="text-[#FD6142] hover:underline"
          >
            Challenge homepage
          </LinkPreview>
        </li>
      </ul>
    </div>
  ),
};

export default rare26Project;
