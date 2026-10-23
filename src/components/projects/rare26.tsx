"use client";

import React from "react";
import { Project } from "@/components/project-card";
import { LinkPreview } from "@/components/ui/link-preview";

/**
 * RARE26 — Early Barrett's Neoplasia Detection Challenge (EndoVis, MICCAI 2026)
 *
 * Every number here is quoted verbatim from the project's own records.
 * Do not add, round or re-derive numbers.
 *
 * Hard constraints:
 *  - no rank, no leaderboard score
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
  description:
    "A solo challenge entry in medical imaging: a frozen backbone, a 4096-parameter read-out head, and 1835 pre-registered cross-center comparisons — 77% of which resolved nothing, and are published anyway.",
  highlights: [
    "Asked whether the usual upgrades buy anything at this data scale, and measured the answer: with 158 positive training images, 11 pretrained backbones, 7 read-out heads, layer choice, one-class versus discriminant scoring, multiple-instance pooling, fusion, test-time augmentation and four robustness modules — 1835 paired cross-center comparisons in all",
    "None was detectably better than the delivered configuration in both cross-center directions; 1415 of the 1835 comparisons (77%) established no improvement, and every one is published with the rule that classified it",
    "Made that negative credible: the adoption rule was written before each grid ran — both directions, paired bootstrap, a practical-significance threshold measured from a power curve rather than chosen, and never the argmax of a grid, since a nested search showed the inner loop's best cell was detectably worse on the fold it never saw in 9 of 22 cases",
    "The one change that survived scores each of the 49 spatial positions separately and pools the top 2% instead of averaging the feature map first, because averaging dilutes a small lesion — cross-center it cut residual false positives at 90% recall by 66.9% and 89.3%",
    "Kept the encoder frozen by design, not by budget: a provider-pretrained GI-endoscopy ResNet-50 used unchanged, with only a 4096-parameter closed-form shrinkage discriminant fitted on its 7×7 feature map — which is what made 1835 closed-form comparisons affordable on one laptop GPU",
    "Delivered as a CPU-only container: 26.0 s end to end per 384-frame case on the evaluation hardware against a 600 s budget; the platform's stored results matched a local run with zero rank changes",
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
      <h3 className="text-xl font-bold mb-3">
        Task and Data
      </h3>
      <p className="mb-4 leading-relaxed">
        I entered RARE26 alone to detect early neoplasia in Barrett's
        esophagus from endoscopy images. The training data contained 3,095
        images, including 158 positives, from two retrospective Dutch centers
        without a standardized acquisition protocol. The challenge test data
        came from 12 centers and included prospective collection. The scoring
        metric was positive predictive value at 90% recall, with prevalence
        fixed at 1%.
      </p>
      <p className="mb-4 leading-relaxed">
        I kept the provider-pretrained ResNet-50 / GastroNet-5M DINOv1
        backbone frozen and fitted a closed-form shrinkage Gaussian
        discriminant with 4,096 learned parameters, about 16 KB. Cached
        features made repeated readout comparisons feasible on my laptop GPU.
        Dataset and weight agreements required local processing, so the
        experiments ran on an RTX 4060 Laptop GPU with 8 GB of memory.
      </p>
      <p className="mb-6 leading-relaxed">
        Before each grid, I specified the rule for adopting a change. Across
        16 experiment families and 1,835 cross-center comparisons, one change
        was adopted. Of the comparisons, 1,415 (77%) established no
        difference: 734 ruled out a practically meaningful AUROC difference
        and 681 remained inconclusive.
      </p>

      <h3 className="text-xl font-bold mb-3">
        Evaluation Protocol
      </h3>
      <p className="mb-4 leading-relaxed">
        I evaluated both cross-center directions: train on center 1 and test
        on center 2, then reverse them. Center 1 contributed 2,279 images with
        61 positives; center 2 contributed 816 images with 97 positives. The
        protocol combined paired uncertainty estimates with a threshold for
        practical relevance.
      </p>
      <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
        <li>
        Compared configurations with a paired bootstrap in both directions,
        resampling positive and negative pseudo-case groups rather than
        treating every image as independent.
      </li>
        <li>
        Derived a practical threshold of |ΔAUROC| = 0.0165 from a power curve
        on these data, and wrote the adoption criteria before each
        experimental grid.
      </li>
        <li>
        Used nested evaluation to check model selection. In 9 of 22 cases, the
        inner loop's best configuration performed detectably worse on unseen
        folds.
      </li>
      </ul>
      <p className="mb-4 leading-relaxed">
        The scoring metric depends strongly on the negative tail at high
        recall. In one cross-center baseline, 6 false positives among 719
        negatives determined specificity at 90% recall.
      </p>
      <p className="mb-6 leading-relaxed">
        The public repository includes a scorer reproducing the official
        procedure: interpolate precision at recall 0.9 after resampling
        positives to 1% prevalence, repeat 1,000 times and take the median.
      </p>

      <h3 className="text-xl font-bold mb-3">
        AUROC and the Scoring Metric
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
              <td className="py-2 px-4">
        Per-position scoring, top-2% pooling (train c1)
      </td>
              <td className="py-2 px-4 text-right">
        0.1045 → 0.5214
      </td>
              <td className="py-2 px-4 text-right">
        +0.0163 (practical threshold 0.0165)
      </td>
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
        The adopted change moved the scoring metric substantially while its
        AUROC gain sat just below the practical threshold. In the later
        multi-scale comparison, AUROC changed by −0.0048 while the scoring
        metric fell by 69%.
      </p>
      <p className="mb-4 leading-relaxed">
        For equal-weight multi-scale pooling in the train-c1 direction, false
        positives rose from 6 to 34 and specificity at 90% recall fell from
        0.9917 to 0.9527. This experiment was run after submission and the
        change was not adopted.
      </p>
      <p className="mb-6 leading-relaxed">
        These measurements concern internal cross-center validation. They show
        why I reported AUROC and the challenge metric together: a small change
        in one can coexist with a large change in the other. The two-center
        validation cannot reproduce the full shift to the challenge's
        12-center test set.
      </p>

      <h3 className="text-xl font-bold mb-3">
        The Adopted Readout
      </h3>
      <p className="mb-4 leading-relaxed">
        I scored each of the 49 spatial positions separately and pooled the
        top 2%, rather than averaging the feature map before scoring.
        Cross-center residual false positives at 90% recall fell by 66.9% when
        training on c2 and by 89.3% when training on c1.
      </p>
      <p className="mb-6 leading-relaxed">
        The AUROC gains were +0.0486 and +0.0163 respectively. The latter is
        close to the practical threshold of 0.0165, but the pre-specified
        adoption rule required a detectable improvement in both directions.
        The change met that rule.
      </p>

      <h3 className="text-xl font-bold mb-3">
        Experiment Coverage and Results
      </h3>
      <p className="mb-4 leading-relaxed">
        The 1,835 comparisons covered 11 pretrained backbones, 7 readout
        heads, one-class and discriminant scoring, multiple-instance pooling,
        fusion, test-time augmentation and four robustness modules. The
        published results include the rule used to classify each comparison.
      </p>
      <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
        <li>
        734 comparisons ruled out a practically meaningful AUROC difference in
        both directions. This conclusion concerns AUROC and does not establish
        equivalence on the challenge scoring metric.
      </li>
        <li>
        681 comparisons were inconclusive. Together with the 734 above, they
        make up the 1,415 comparisons that established no difference.
      </li>
        <li>
        61 cells cleared the practical AUROC threshold in both directions
        against their own references: 60 used ViT backbones and one used
        out-of-domain CNN weights. None used the delivered backbone.
      </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Within these experiments, no tested alternative configuration
        detectably outperformed the submitted configuration in both
        cross-center directions. The full comparison set and classification
        rules are linked below.
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
        layer4 features, 7×7×2048; signed power transform, per-position
        discriminant scoring and top-2% pooling. The shrinkage coefficient was
        selected with 8 repetitions of grouped 5-fold cross-validation.
      </td>
            </tr>
            <tr className="border-b border-gray-200 bg-[#fbf3e5]/50">
              <td className="py-2 px-4">Submission</td>
              <td className="py-2 px-4">
        CPU-only Docker container; one case contains 384 frames with a 600 s
        budget. End-to-end wall time, including startup and model loading:
        26.0 s on evaluation hardware and 15.8 s on a laptop CPU. Peak CPU
        memory: 2–3 GB.
      </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 px-4">Reproduction</td>
              <td className="py-2 px-4">
        Two separate checks: offline computation versus the container on 16
        official sample images, maximum absolute difference 4.917e-07;
        platform-stored results versus a local run, maximum difference
        1.31e-06 and Spearman 1.0000. The container also ran with network
        access disabled.
      </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mb-3">
        Scope of the Results
      </h3>
      <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
        <li>
        This is a challenge research system. The measurements here cover the
        cross-center experiments and container checks described above.
      </li>
        <li>
          The backbone weights are provider-pretrained and covered by a separate
          data use agreement that forbids redistribution. The repository contains
          no weights, only the path to obtain them, and no challenge images are
          redistributed.
        </li>
        <li>
        The training centers were retrospective and the test set included
        prospective data from 12 centers. The internal validation measures a
        narrower distribution shift than the final challenge evaluation.
      </li>
        <li>
        The closed testing phase has ended. This page describes the method,
        internal cross-center measurements and software delivery.
      </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The challenge required MIT-licensed code as a condition of entry. I
        released the code and full method report, archived the software on
        Zenodo and submitted the official four-page method form with the
        closed-testing entry.
      </p>

      <h3 className="text-xl font-bold mb-3">Code, Report and Figures</h3>
      <p className="mb-4 leading-relaxed">
        Everything below is public under the MIT license in the{" "}
        <LinkPreview
          url="https://github.com/liyifreddy/rare26-frozen-readout"
          className="text-[#FD6142] hover:underline"
        >
          project repository
        </LinkPreview>
        , together with the full technical report; the official four-page
        method report was submitted to the challenge platform with the
        closed-testing entry. The code is archived on Zenodo under the DOI{" "}
        <LinkPreview
          url="https://doi.org/10.5281/zenodo.22728882"
          className="text-[#FD6142] hover:underline"
        >
          10.5281/zenodo.22728882
        </LinkPreview>
        .
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
