"use client";

import React from "react";
import ProjectGrid from "@/components/project-grid";
import { Project } from "@/components/project-card";
import { Tabs } from "@/components/ui/tabs";
import { LinkPreview } from "@/components/ui/link-preview";
import { rare26Project } from "@/components/projects/rare26";

// 定义Tab类型
type Tab = {
  title: string;
  value: string;
};

// 示例项目数据
const projectsData: Project[] = [
  {
    id: "visual-object-centric",
    title:
      "Self-Supervised Learning of a Visual Object-Centric Representation for Robotic Manipulation",
    organization: "TU Darmstadt (IAS Lab) × École Centrale de Lyon (LIRIS)",
    timeframe: "October 2024 - April 2026",
    supervisor:
      "Prof. Jan Peters, Prof. Liming Chen, Alexandre Chapin, Alap Kshirsagar",
    description:
      "M.Sc. thesis, TU Darmstadt — submitted 23 March 2026, defended 17 April 2026, graded 1.3 (sehr gut). Investigated how frozen, self-supervised visual representations can be integrated into continuous robotic manipulation policies under standard hardware constraints (single 11–12 GB GPU).",
    highlights: [
      "Structure beats capacity: object-centric slots generalize +22.4pp over the strongest DINO baseline (55.0% vs 32.6% for global [CLS]) under matched conditions, same policy, no fine-tuning",
      "On ManiSkill3 PickCube-v1, with a 2D spatial-goal anchor, exact calibration and native-resolution (224×224) rendering, the full system reached 68.7 ± 4.2% SR, within 3pp of a privileged 3D-oracle bound (71.7%), on a single 11–12 GB GPU with no encoder fine-tuning",
      "Adapted the SPOT encoder (frozen DINO ViT-B/16 + Slot Attention) as a structural bottleneck compressing dense features into object-centric slots",
      "Failure taxonomy identified Near-Miss placement — not grasping — as the dominant failure mode under the pure-visual condition; an explicit 2D spatial-goal token took success from 31.0% to 55.0% at the same calibration and resolution, and with exact calibration and native-resolution rendering the full system reached 68.7%",
      "Built an automated kinematic failure taxonomy separating spatial-precision (Near-Miss) from object-tracking (No-Grasp) failures; transfers across tasks",
      "Offline feature caching pipeline reduced per-epoch training from ~1-2 hours to ~1-2 minutes",
    ],
    skills: [
      "PyTorch",
      "Slot Attention",
      "ManiSkill3",
      "SLURM",
      "Behavior Cloning",
      "Imitation Learning",
      "Embodied AI",
      "Self-Supervised Learning",
      "Multi-View Fusion",
      "Spatial Grounding",
      "Linux",
    ],
    image: "/projects/visual.webp",
    category: "research",
    content: (
      <div className="text-[#333333]">
        <h3 className="text-xl font-bold mb-3">Overview & Problem Statement</h3>
        <p className="mb-4 leading-relaxed">
          State-of-the-art visuomotor policies such as ACT and Diffusion Policy
          achieve high success rates but train the vision backbone end to end,
          which costs GPU memory and demonstrations. With RGB observations and
          1,000 demonstrations on PickCube-v1, the ManiSkill3 paper reports 98%
          for ACT and 100% for Diffusion Policy, but 3% for its plain
          behavior-cloning baseline (Tao et al., arXiv:2410.00425, Table III);
          with 100 demonstrations ACT and Diffusion Policy drop to 28% and 76%.
        </p>
        <p className="mb-6 leading-relaxed">
          This master's thesis investigates how frozen, self-supervised visual
          representations can be integrated into continuous robotic manipulation
          policies under standard hardware constraints. Rather than fine-tuning
          large vision backbones end-to-end, we adapt the{" "}
          <strong>SPOT encoder</strong> — a self-supervised model combining a
          frozen DINO ViT-B/16 backbone with Slot Attention — as a structural
          bottleneck that compresses dense visual features into compact
          object-centric slot representations.{" "}
          <strong>
            The full pipeline runs on a single 11–12 GB GPU.
          </strong>{" "}
          We identified and addressed three core bottlenecks: dimensionality and
          memory scaling of dense VFM features, task objective misalignment, and
          the "Last Millimeter" spatial bottleneck caused by the absence of
          absolute 3D coordinates in 2D slot representations.
        </p>

        <h3 className="text-xl font-bold mb-3">System Architecture</h3>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          1. Visual Perception (Frozen)
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Dual fixed-camera RGB setup (Base + Side camera); 128×128 for all
            main experiments, 224×224 only for the full system.
          </li>
          <li>
            Frozen SPOT encoder: DINO ViT-B/16 backbone + Slot Attention (K=7
            slots per camera).
          </li>
          <li>Output: 14 object slots per timestep, each 256-dimensional.</li>
          <li>
            <strong>Offline feature caching</strong> reduces per-epoch training
            time from 1–2 hours to ~1–2 minutes.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          2. Token Construction & Multimodal Fusion
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>14 visual slot tokens (linear projection to 256-dim).</li>
          <li>
            1 proprioception token (7-DoF joint positions → MLP → 256-dim).
          </li>
          <li>
            1 spatial goal token (2D projected goal coordinates → MLP →
            256-dim).
          </li>
          <li>1 learnable action token.</li>
          <li>
            <strong>Total:</strong> 17 tokens per timestep × T=5 frames = 85
            tokens per sequence.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          3. Policy Decoding (Trainable)
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            <strong>Autoregressive Multimodal Sequence Policy:</strong>{" "}
            GPT-style causal Transformer decoder (8 layers, 8 attention heads,
            hidden dim 256).
          </li>
          <li>
            <strong>Action Chunking:</strong> predicts H=10 step action chunks.
          </li>
          <li>
            <strong>Decoupled gripper:</strong> hard step function + separate
            normalization for binary gripper state.
          </li>
          <li>
            <strong>Action space:</strong> 7-DoF joint positions (Z-score
            normalized) + binary gripper.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3">Key Experiments and Results</h3>
        <p className="mb-3">
          Evaluated on ManiSkill3 PickCube-v1 under a held-out-seed protocol
          (train seeds 0–9,999, eval seeds ≥10,000), best checkpoint over
          3×300 episodes:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="border-b-2 border-[#C19A49]">
                <th className="py-2 px-4 font-semibold">Configuration</th>
                <th className="py-2 px-4 font-semibold text-right">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">Pure Visual (no goal)</td>
                <td className="py-2 px-4 text-right">31.0 ± 2.8%</td>
              </tr>
              <tr className="border-b border-gray-200 bg-[#fbf3e5]/50">
                <td className="py-2 px-4 font-medium">2D Spatial Projection</td>
                <td className="py-2 px-4 text-right font-medium">
                  55.0 ± 2.9%
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-[#C19A49]/10">
                <td className="py-2 px-4 font-bold text-[#816334]">
                  SPOT-Exact-224 (best)
                </td>
                <td className="py-2 px-4 text-right font-bold text-[#816334]">
                  68.7 ± 4.2%
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500">
                  3D Oracle (upper bound)
                </td>
                <td className="py-2 px-4 text-right text-gray-500">
                  71.7 ± 4.1%
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">DINO Global [CLS]</td>
                <td className="py-2 px-4 text-right">32.6 ± 1.5%</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">DINO 4×4 patches (32 tokens)</td>
                <td className="py-2 px-4 text-right">31.7 ± 3.0%</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500">
                  DINO 14×14 dense — memory-forced to T=1, H=1
                </td>
                <td className="py-2 px-4 text-right text-gray-500">1.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          Two caveats I report rather than exploit. The 14×14 dense row is not
          evidence about token count: an 11 GB memory budget forced T=1 and
          H=1, stripping the temporal context every other row keeps. The honest
          token-count argument is the 4×4 grid — 16× the tokens of global
          [CLS], statistically indistinguishable success rate. Token budget is
          not what drives the gap; representational structure is.
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          Key Findings
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-6">
          <li>
            <strong>Structure beats capacity:</strong> with the policy, the
            goal token and the rendering all held fixed and only the encoder
            changed, object-centric slot grouping outperforms all DINO
            baselines (+22.4pp), while a 4×4 patch grid with 16× the tokens of
            global [CLS] gives no gain — the driver is representational
            structure, not token count.
          </li>
          <li>
            <strong>Explicit 2D spatial grounding</strong> (projected from a
            known 3D target, and therefore privileged rather than
            self-supervised) targets the Near-Miss placement bottleneck.
            Near-Miss failures fall from 31.0% under the pure-visual condition
            to 21.0% with the deployable 2D anchor, and reach 2.5% only under a
            privileged 3D goal. No-Grasp failures were not improved across
            all three conditions (15 / 15 / 24 per 200 episodes) — spatial
            grounding fixes placement, not object tracking. The two bottlenecks
            need different fixes.
          </li>
          <li>
            <strong>Native 224×224 rendering</strong> removes an upsampling
            artifact and adds a further +10pp, lifting the full system to 68.7%.
          </li>
          <li>
            <strong>Capacity does not transfer:</strong> token concatenation and
            bidirectional cross-attention reach the same held-out SR, but
            cross-attention shows a ~29pp train-to-test gap — its extra
            parameters overfit the training trajectories rather than learning
            genuine cross-modal structure.
          </li>
          <li>
            <strong>Generic transforms ignore physical semantics:</strong> one
            global Z-score across the full 9-DoF action vector collapses
            success to 0% — finger joints (σ ≈ 0.011) and arm joints (σ ≈ 0.21)
            differ by roughly 100× in scale, so the normalization amplifies
            gripper noise into the gradient. Restricting normalization to the 7
            arm joints restores 31%.
          </li>
          <li>
            <strong>Kinematic Failure Taxonomy:</strong> an automated,
            encoder-agnostic analysis across 200 episodes per configuration
            separates grasping failures from Near-Miss placement errors, turning
            a binary success rate into evidence-driven diagnostics — and
            transfers unchanged to StackCube-v1, where it isolates occlusion as
            the dominant bottleneck. Run there, it reports No-Grasp at 72%: in
            144 of 200 episodes the arm never picked up the first cube, from arm
            self-occlusion of the fixed side camera.
          </li>
          <li>
            <strong>A negative result that shaped the encoder choice:</strong>{" "}
            before settling on SPOT, I wired the multi-teacher distilled
            encoder Theia into Slot Attention three different ways on Pascal
            VOC; none of them separated objects. Theia&apos;s translator is
            optimized for semantic alignment across modalities, not for the 2D
            patch structure Slot Attention relies on.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3">Technical Infrastructure</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            <strong>Simulator:</strong> ManiSkill3 (SAPIEN), Franka Panda robot,
            PickCube-v1 and StackCube-v1.
          </li>
          <li>
            <strong>Training:</strong> student SLURM cluster, one 11–12 GB GPU
            per job (RTX 2080 Ti or RTX 3080 Ti), PyTorch, offline feature
            caching pipeline.
          </li>
          <li>
            <strong>Engineering under a small GPU:</strong> an end-to-end
            ResNet18 encoder ran out of memory on the 11 GB card at once, so a
            frozen encoder was a hardware necessity; caching dense Theia
            features would have taken about 47 GB, while 7 SPOT slots take
            about 1.1 GB; replacing random shuffling (93 s per batch of random
            disk reads) with chunk-level shuffling kept peak memory under 1 GB.
          </li>
          <li>
            <strong>Getting the measurement right first:</strong> local replay
            of the official expert demonstrations initially succeeded in about
            10% of episodes; fixing three causes (50-step truncation, the
            physics backend, HDF5 key ordering) brought it to 100%.
          </li>
          <li>
            <strong>Dataset:</strong> 1,000 expert demonstrations, ~77,000
            frames, chunk-based DataLoader.
          </li>
          <li>
            <strong>Evaluation:</strong> Held-out seed protocol (seeds 10000+),
            stability test (300 episodes, 3 runs).
          </li>
          <li>
            <strong>Codebase:</strong> Modular pipeline separating encoder,
            token construction, policy, and evaluation.
          </li>
        </ul>
      </div>
    ),
  },
  rare26Project,
  {
    id: "repose-image-translation",
    title: "Repose via Image Translation: 6D Pose & Synthetic Data",
    organization:
      "Fraunhofer IGD / Graphisch-Interaktive Systeme (GRIS Lab), TU Darmstadt",
    timeframe: "November 2022 - August 2023",
    supervisor: "Thomas Pöllabauer",
    description:
      "Architected an automated synthetic data generation pipeline on a SLURM cluster and evaluated generative image translation models for industrial 6D pose estimation.",
    highlights: [
      "Generated 36,000+ physically-based rendering (PBR) images of YCB objects using BlenderProc",
      "Deployed conditional image translation models (CoCosNet-v2, DragGAN) to evaluate style-preserving transformations",
      "Utilized CosyPose to validate multi-view 6D pose estimation consistency across generated images",
      "Configured complex headless server environments via Docker with X11 forwarding on GPU-less login nodes",
      "Navigated and resolved strict CUDA 11/12 version conflicts across different SLURM partitions",
      "Identified that human-centric generative models fail zero-shot transfer on rigid industrial objects",
    ],
    skills: [
      "BlenderProc",
      "CoCosNet-v2",
      "CosyPose",
      "6D Pose Estimation",
      "PBR Data Generation",
      "PyTorch",
      "OpenCV",
      "Docker",
      "SLURM",
    ],
    image: "/projects/repose0.webp",
    category: "research",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          A two-person lab project (Yi Li and Jiayi Li) at Fraunhofer IGD. The
          question: can a conditional image-translation model change the style
          of a pose-annotated image while preserving its 6D pose cues? We
          generated physically-based rendering (PBR) data of YCB objects with
          BlenderProc, adapted CoCosNet-v2 for image translation and used
          CosyPose for pose estimation, with PyTorch and OpenCV. The PBR data
          was generated under my cluster account, and I wrote most of the final
          report. The project ran on the Fraunhofer IGD SLURM cluster (A100),
          with Docker managing the containers.
        </p>

        <h3 className="text-xl font-bold mb-4">Detailed Implementation</h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Data Generation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Generated <strong>36,000+</strong> PBR data images for BOP YCB
            objects (drill, bowl, and mug) using BlenderProc. This included
            transformation matrices, depth maps, and masks from BopToolKit under
            different rendering textures, illumination conditions, angles, and
            scales.
          </li>
          <li>
            Employed Blender 2.93 and BlenderProc2 to create datasets with image
            size 1280x1280, generating 10k training images and 2k validating
            images per object (10 textures for training; validation adds 5
            unseen ones), about two days per object on one node.
          </li>
          <li>
            Utilized DaVinci Resolve 18 for chroma keying green screen videos to
            obtain real data for experimentation.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          2. Image Translation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Modified CoCosNet-v2 to perform image translation tasks, initially
            reproducing results with the DeepFashion dataset.
          </li>
          <li>
            Implemented a data loader to train the model with our generated
            data, encountering and solving numerous issues related to
            dependencies and environment setup.
          </li>
          <li>
            Explored other image translation models like PITI, Paint by Example,
            and DragGAN, testing their capabilities in generating diverse poses
            while maintaining style consistency.
          </li>
          <li>
            <strong>Research Insight:</strong> Identified a key limitation:
            human-centric generative models relying on OpenPose priors fail to
            zero-shot transfer to rigid industrial objects lacking anatomical
            keypoints — a finding with direct implications for industrial object
            pose estimation pipelines.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          3. Pose Estimation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            Utilized CosyPose, which leverages multi-view 6D object pose
            estimation, to validate the outcomes of the image translation
            models.
          </li>
          <li>
            Addressed challenges in maintaining geometric consistency and style
            during pose estimation through iterative debugging and testing.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">Challenges and Solutions</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            Encountered issues with account access on the Slurm cluster, leading
            to delays and, after access ended in August 2023, moving to a
            self-paid preemptible cloud instance (NVIDIA T4, 16 GB); when the
            instance was reclaimed mid-month, the data was regenerated.
          </li>
          <li>
            Faced complex infrastructure bottlenecks for headless server
            rendering:{" "}
            <strong>
              configured Docker containers with X11 forwarding and GLFW on
              GPU-less login nodes
            </strong>
            , and resolved strict <strong>CUDA 11/12 version conflicts</strong>{" "}
            across SLURM partitions.
          </li>
          <li>
            Dealt with the inherent complexity of integrating image translation
            and pose estimation models, requiring a deep understanding of both
            domains and significant debugging efforts.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">Future Work</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Develop a suitable approach for encoding pose information of
            objects, enabling the adaptation of CoCosNet-v2 from human datasets
            to object datasets.
          </li>
          <li>
            Experiment with StyleGAN-based models and novel approaches like
            Pivotal Tuning Inversion (PTI) to enhance style control and accuracy
            in pose estimation.
          </li>
          <li>
            Investigate the integration of image translation and pose estimation
            models, focusing on defining loss functions and feature fusion
            techniques.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "semantic-segmentation-diffusion",
    title: "Semantic Segmentation with Diffusion Models",
    organization: "MEC-Lab / GRIS, TU Darmstadt",
    timeframe: "March 2023 - October 2023",
    supervisor: "Yannik Frisch",
    description:
      "Generating paired histology images and segmentation masks with latent diffusion, as synthetic training data for medical segmentation. A three-person lab practical in which each of us implemented and ran the full pipeline.",
    highlights: [
      "Built a VAE-with-segmentation-decoder baseline, then a Latent Diffusion Model with a denoising U-Net generating image and mask jointly, so a synthetic pair stays consistent instead of the two being sampled independently",
      "Trained from scratch on the BCSS breast-cancer histology dataset, through the MNIST-E → BCSS generalization gap: a model producing clean toy samples had to hold up on high-resolution tissue with far more classes and far fewer examples each",
      "Read the failure signal before changing the model: on BCSS the mask loss climbed while the reconstruction loss stayed flat, so the problem sat on the mask side",
      "Result: structurally it worked (paired image and mask from one joint latent space), but sample quality was not yet good enough to train a segmentation model on",
    ],
    skills: [
      "Semantic Segmentation",
      "Diffusion Models",
      "VAE",
      "LDM",
      "U-Net",
      "PyTorch",
      "Data Augmentation",
      "Docker",
      "Linux",
    ],
    image: "/projects/segdiff2.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          A three-person lab practical (Visual Computing Lab, TU Darmstadt) in
          which each of us implemented and ran the full pipeline. The goal was
          to generate paired images and masks for{" "}
          <span className="font-semibold">semantic segmentation</span> of
          medical images with{" "}
          <span className="font-semibold">diffusion models</span>, as synthetic
          data to augment small, manually annotated training sets. All models
          were trained from scratch. Training a downstream segmentation model
          on the synthetic data was the next step and was not reached in this
          project.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Data Generation</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Utilized the MNIST-Extended (MNIST-E) and Breast Cancer Semantic
            Segmentation (BCSS) datasets for training and validation.
          </li>
          <li>
            Generated synthetic images and segmentation masks using VAE and LDM
            techniques, aiming to improve the diversity and quality of training
            data.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Model Architecture</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Implemented a VAE with a segmentation decoder for initial
            experiments on the MNIST-E dataset.
          </li>
          <li>
            Transitioned to Latent Diffusion Models (LDM) to leverage their
            computational efficiency and flexibility in encoding different types
            of conditions.
          </li>
          <li>
            Developed a denoising U-Net within the LDM framework to enhance the
            quality of generated images and masks.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Approaches and Results
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            A VAE with a segmentation decoder, with an LDM on its latent space,
            worked on MNIST-E but not on BCSS: the validation mask loss rose
            from 0.4 to 1.7 while the reconstruction loss stayed around 0.2.
          </li>
          <li>
            Standard anti-overfitting steps (binary masks, larger tiles, data
            augmentation) improved the image side; the mask side behaved the
            same.
          </li>
          <li>
            Encoding image and mask together in one VAE and running the LDM on
            that joint latent space worked on BCSS: it generated paired images
            and masks, with improved reconstruction of both.
          </li>
          <li>
            Two separate VAEs, one per side, with an LDM over both, produced
            only noise — the same information split across two latent spaces
            could not be generated, while one joint space could.
          </li>
          <li>
            Sample quality was not yet usable: images skewed pink-purple, were
            over-smoothed and lacked real tissue texture, and masks were
            blockier than real ones.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Challenges and Solutions
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Faced difficulties in generalizing models trained on MNIST-E to the
            BCSS dataset due to differences in data complexity.
          </li>
          <li>
            Standard anti-overfitting steps (data augmentation, larger image
            tiles) did not fix the mask side; what worked was changing how the
            mask enters the model — one joint latent space for image and mask.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Work</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            Improve image synthesis quality by experimenting with different
            architectures and conditioning techniques.
          </li>
          <li>
            Explore the use of VQ-VAE and VQ-GAN to enhance the fidelity of
            generated images and segmentation masks.
          </li>
          <li>
            Train a downstream segmentation model on the synthetic pairs and
            measure whether they help.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "square-explainability",
    title: "SQuARE — Behavioral Testing & Explainability for QA",
    organization: "UKP Lab, TU Darmstadt (Prof. Iryna Gurevych)",
    timeframe: "October 2022 - February 2023",
    supervisor: "Haritz Puerto",
    description:
      "Behavioral testing and explainability for QA models on the UKP-SQuARE platform — a four-person lab project in which I integrated the team's modules into the platform, built the frontend, ran the analysis and wrote much of the core code.",
    highlights: [
      "Built a Dockerized CheckList microservice for the UKP-SQuARE platform, running Minimum Functionality and NER Invariance tests against BERT/RoBERTa QA models — capability-level testing rather than a single aggregate score",
      "Integrated BertViz attention visualization end to end, from the inference API through a Vue.js frontend, so behavior on a test suite and attention on a single question sit in the same place",
      "Integrated the other team members' modules into the platform and produced the analysis and results",
      "Code is in the open-source square-core repository (model-api-v3 branch)",
    ],
    skills: [
      "NLP",
      "QA models",
      "Explainability (XAI)",
      "BertViz",
      "Vue.js",
      "Docker",
      "API development",
      "Hugging Face",
      "Linux",
      "Scientific Writing",
      "Git",
    ],
    image: "/projects/ukp.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          A four-person lab project on UKP-SQuARE, the question-answering
          platform of the UKP Lab at TU Darmstadt: analyzing and testing QA
          models through{" "}
          <span className="font-semibold">behavioral testing</span> and{" "}
          <span className="font-semibold">explainability</span>. I integrated
          the other team members&apos; modules into the platform, built the
          frontend, ran the analysis and produced the results, and wrote much
          of the core code. I integrated{" "}
          <span className="font-semibold">BertViz</span> into UKP-SQuARE through{" "}
          <span className="font-semibold">Vue.js</span> and{" "}
          <span className="font-semibold">modelinference API</span> with{" "}
          <span className="font-semibold">Docker</span>. We created a{" "}
          <span className="font-semibold">microservice</span> to run CheckList
          for <span className="font-semibold">behavioral testing</span> and
          analyzed the use cases. We tested several BERT and RoBERTa-based QA
          models on <span className="font-semibold">Hugging Face</span>. The
          method is available at{" "}
          <LinkPreview
            url="https://square.ukp-lab.de/"
            className="text-[#FD6142] hover:underline"
          >
            UKP-SQuARE
          </LinkPreview>
          . Our code can be found in the model-api-v3 branch of the{" "}
          <LinkPreview
            url="https://github.com/UKP-SQuARE/square-core/tree/model-api-v3"
            className="text-[#FD6142] hover:underline"
          >
            Github repository
          </LinkPreview>
          .
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Explainability Integration
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Integrated BertViz into SQuARE to provide interactive visualizations
            of attention mechanisms in Transformer models.
          </li>
          <li>
            Implemented both backend and frontend components using Vue.js and
            Docker, ensuring seamless integration with existing QA pipelines.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Behavioral Testing</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Developed a microservice to run CheckList, enabling comprehensive
            behavioral testing of QA models.
          </li>
          <li>
            Conducted Minimum Functionality Tests for unit testing capabilities
            like taxonomy and vocabulary.
          </li>
          <li>
            Evaluated model robustness using Invariance (INV) tests, focusing on
            Named Entity Recognition (NER) and other critical aspects.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">3. Model Evaluation</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Tested multiple BERT and RoBERTa-based QA models hosted on Hugging
            Face.
          </li>
          <li>
            Conducted detailed evaluations using CheckList to compare model
            performance against expected behavioral outcomes.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Achievements</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Successfully integrated explainability methods into SQuARE,
            enhancing the interpretability and trustworthiness of QA models.
          </li>
          <li>
            Improved the platform's ability to visualize and understand model
            decisions through BertViz.
          </li>
          <li>
            Conducted extensive behavioral testing to ensure model robustness
            and reliability.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Work</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            Automate behavioral tests to streamline model evaluation processes.
          </li>
          <li>
            Explore contrastive explanations to provide deeper insights into
            model decisions and improve interpretability.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "endoscopy-ood",
    title: "Out-of-Distribution Robustness for Endoscopy",
    organization: "Medical & Environmental Computing (MEC-Lab)",
    timeframe: "December 2022 - February 2023",
    supervisor: "Henry Krumb",
    description:
      "Built realistic OOD augmentations (overlays, high-frequency noise transfer, lighting shifts) and trained a MobileNet on the Kvasir GI dataset, measuring the in-distribution → OOD accuracy drop (82.1% → 40.3%) — the same failure-under-shift question as the thesis, in another domain.",
    highlights: [
      "Implemented OOD augmentations by overlaying objects on endoscopy images with high-frequency noise extraction",
      "Applied random value and hue shifts to simulate different lighting conditions and anomalies",
      "Trained a MobileNet classifier on the Kvasir dataset; accuracy fell from 82.1% in distribution to 40.3% under the OOD augmentations",
      "A three-person project; I did most of the work, and the augmentations are part of MEC-Lab's open-source OOD framework FrOoDo",
      "Improved realism by aligning image lighting with object lighting and optimizing overlay positions",
    ],
    skills: [
      "Medical Image Processing",
      "Out-of-Distribution Robustness",
      "Data Augmentation",
      "OpenCV",
      "PyTorch",
      "MobileNet",
      "Git",
    ],
    image: "/projects/endoscopy.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          A three-person project at MEC-Lab, most of which I did. We built
          realistic out-of-distribution (OOD) augmentations for{" "}
          <span className="font-semibold">endoscopy</span> images — image
          attribute shifts and realistic artifacts — and measured how much a
          classifier loses under them. The augmentations are part of
          MEC-Lab&apos;s open-source OOD framework FrOoDo; the code is on{" "}
          <LinkPreview
            url="https://github.com/MECLabTUDA/FrOoDo/tree/main/froodo/ood/augmentations/endoscopy"
            className="text-[#FD6142] hover:underline"
          >
            {" "}
            GitHub
          </LinkPreview>
          .
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Data Augmentation</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Implemented OOD augmentations by overlaying objects such as colored
            polyps, coins, pills, and food items (e.g., corn, kidney beans) on
            endoscopy images.
          </li>
          <li>
            Extracted high-frequency noise from images, applied random rotations
            to objects, and placed them in random locations before overlaying
            them with the extracted noise.
          </li>
          <li>
            Applied random value and hue shifts to simulate different lighting
            conditions and anomalies like blood or food remnants in the
            digestive tract.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Model Training and Evaluation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Trained a MobileNet classifier on the{" "}
            <span className="font-semibold">Kvasir</span> dataset to detect
            gastrointestinal diseases.
          </li>
          <li>
            Evaluated the model's performance on both in-distribution (IN) and
            OOD data, observing a significant drop in accuracy for OOD data (IN:
            82.1%, OOD: 40.3%).
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Challenges and Solutions
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Addressed issues with lighting effects, object size, and overlay
            positions by aligning image lighting with object lighting and adding
            bounding boxes to limit insertion locations.
          </li>
          <li>
            Improved realism by detecting interesting pixels to avoid overlaying
            on metadata and ensuring objects like pills dissolve realistically.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Results and Conclusion
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            The experiment demonstrated a significant performance drop in OOD
            scenarios, highlighting the necessity of OOD detection in endoscopy.
          </li>
          <li>
            Provided qualitative assessments showing misclassifications where
            humans could still perceive the correct classes, further emphasizing
            the need for robust OOD detection methods.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Work</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            Enhance the physical realism of augmented images through
            physically-based rendering techniques.
          </li>
          <li>
            Increase the diversity and quantity of samples and renderings to
            improve model training and evaluation.
          </li>
          <li>
            Develop advanced methods for detecting and handling OOD scenarios in
            medical imaging applications.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "escootar",
    title: "E-ScootAR: Unimodal Warnings for E-Scooter Riders",
    organization: "Telecooperation Lab (TK)",
    timeframe: "April 2021 - July 2021",
    supervisor: "Andrii Matviienko",
    description:
      "Evaluated technological safety measures for e-scooter riders using augmented reality notifications, vibrotactile feedback, and auditory signals.",
    highlights: [
      "Published as CHI 2022 Extended Abstracts (Late-Breaking Work), 6th of 7 authors, evaluating AR, vibrotactile, and auditory warnings for preventing collisions with pedestrians",
      "Created visual warning system and virtual environment in Unity for Microsoft HoloLens 2",
      "Conducted outdoor experiments with 13 participants, analyzing reaction time and safety using Jamovi",
      "Found that AR and auditory warnings create a better feeling of safety than vibrotactile warnings",
    ],
    skills: [
      "Micro-mobility",
      "Unity 3D",
      "HoloLens",
      "Augmented Reality (AR)",
      "UI/UX Design",
      "Statistical Analysis",
      "Jamovi",
      "Arduino IDE",
      "Git",
    ],
    image: "/projects/escooter.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          <LinkPreview
            url="https://dl.acm.org/doi/10.1145/3491101.3519831"
            className="text-[#FD6142] hover:underline"
          >
            Published in CHI 2022 Extended Abstracts (Late-Breaking Work)
          </LinkPreview>
          , this project evaluates technological safety measures for{" "}
          <span className="font-semibold">e-scooter</span> riders. We augmented
          e-scooters with unimodal warnings to prevent collisions with
          pedestrians using AR notifications, vibrotactile feedback, and
          auditory signals. I created the visual warning and virtual environment
          in <span className="font-semibold">Unity</span>, and my teammates used
          Arduino IDE with NodeMCU to set up vibration motors and a reaction
          time tracking button. We conducted an{" "}
          <span className="font-semibold">outdoor experiment</span> with 13
          participants. We did the statistical analysis with{" "}
          <span className="font-semibold">Jamovi</span>. Our results indicate
          that AR and auditory warnings create a better feeling of safety than
          vibrotactile warnings.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Warning Systems</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Developed three different warning assistants: audio, vibrotactile,
            and visual warnings via AR glasses (Microsoft HoloLens 2).
          </li>
          <li>
            Implemented the AR warning system using Unity to create a virtual
            city environment displayed in AR glasses.
          </li>
          <li>
            Integrated vibration motors on the e-scooter's handlebar, controlled
            by a NodeMCU ESP8266 micro-controller, to deliver vibrotactile
            feedback.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Experiment Setup</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Conducted experiments on a spacious outdoor track, ensuring safety
            by restricting speed and supervising the trials.
          </li>
          <li>
            Participants wore AR glasses and rode e-scooters through virtual
            traffic scenarios, receiving warnings via different modalities at
            intersections.
          </li>
          <li>
            Measured reaction time, accident rate, perception, and safety using
            a combination of button presses and Likert-scale questionnaires.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Results and Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Analyzed reaction time and accident rate using repeated measures
            ANOVA, finding significant differences between AR, audio, and
            vibrotactile warnings.
          </li>
          <li>
            AR and audio warnings significantly reduced reaction time compared
            to vibrotactile warnings, but no significant difference was found
            between AR and audio.
          </li>
          <li>
            Participants rated AR and audio warnings higher in terms of
            perception and safety compared to vibrotactile warnings.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Challenges and Solutions
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Addressed issues with the reliability of vibration signals by using
            high-quality vibration devices and ensuring proper synchronization
            with warning signals.
          </li>
          <li>
            Improved the realism of virtual traffic scenarios to better simulate
            real-world conditions without endangering participants.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Work</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            Expand the study to include more participants and diverse traffic
            scenarios, such as interactions with pedestrians and cyclists.
          </li>
          <li>
            Investigate the impact of different traffic densities on the
            effectiveness of warning systems.
          </li>
          <li>
            Explore combinations of different warning modalities to further
            enhance safety and user experience.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "tbbpa-liver-cancer",
    title: "Molecular Docking Study of TBBPA in Liver Cancer",
    organization: "Institutes of Biomedical Sciences, Shanxi University",
    timeframe: "March 2018 - November 2018",
    supervisor: "Zhuoyu Li",
    description:
      "Investigated the regulation of calcium-mediated lysosomal exocytosis and its impact on cell invasion and migration in liver cancer.",
    highlights: [
      "Conducted molecular docking simulations using protein structures from the PDB database with AutoDock Tools and AutoDock Vina",
      "Optimized docking poses using the Lamarckian genetic algorithm and visualized results with PyMOL",
      "Contributed to statistical analysis using unpaired student t-test in GraphPad Prism",
      "Research published in Ecotoxicology and Environmental Safety (2020); I am the 5th author",
    ],
    skills: [
      "Molecular Docking",
      "Protein Structure Analysis",
      "AutoDock",
      "PyMOL",
      "Statistical Analysis",
      "GraphPad Prism",
    ],
    image: "/projects/tbbpa.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          Coming from computer science, I worked with molecular biologists and
          chemists, who ran the cell and molecular experiments, to investigate
          the regulation of calcium-mediated lysosomal exocytosis and its impact
          on cell invasion and migration in{" "}
          <span className="font-semibold">liver cancer</span>. I conducted{" "}
          <span className="font-semibold">molecular docking simulations</span>{" "}
          using protein structures from the{" "}
          <span className="font-semibold">PDB</span> database and{" "}
          <span className="font-semibold">AutoDock</span> Tools and AutoDock
          Vina. I optimized docking poses using the Lamarckian genetic algorithm
          and visualized the docking results with{" "}
          <span className="font-semibold">PyMOL</span>. I contributed to{" "}
          <span className="font-semibold">statistical analysis</span> by using
          unpaired student t-test in GraphPad Prism.{" "}
          <LinkPreview
            url="https://doi.org/10.1016/j.ecoenv.2020.110255"
            className="text-[#FD6142] hover:underline"
          >
            The paper is published
          </LinkPreview>{" "}
          on Ecotoxicology and Environmental Safety.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Molecular Docking Simulations
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Conducted docking simulations to study the interaction between TBBPA
            and the TRPML1 protein.
          </li>
          <li>
            Used AutoDock Tools and AutoDock Vina to perform molecular docking,
            applying the Lamarckian genetic algorithm for optimization.
          </li>
          <li>
            Visualized docking results and protein-ligand interactions using
            PyMOL, identifying key binding sites and interaction patterns.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Statistical Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Performed statistical analysis of experimental data using GraphPad
            Prism.
          </li>
          <li>
            Employed unpaired student t-tests to determine the significance of
            observed effects on cell invasion and migration.
          </li>
          <li>
            Analyzed the impact of TBBPA on intracellular and extracellular
            protein levels, focusing on lysosomal exocytosis markers such as
            CTSB and CTSD.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Collaboration and Interdisciplinary Work
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Worked with a multidisciplinary team to design and execute
            experiments.
          </li>
          <li>
            Contributed to discussions on experimental design, data
            interpretation, and manuscript preparation.
          </li>
          <li>
            Coordinated with experts in molecular docking and bioinformatics to
            refine simulation protocols and validate results.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Work</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            Extend molecular docking studies to other potential protein targets
            involved in lysosomal exocytosis.
          </li>
          <li>
            Investigate the in vivo effects of TBBPA on liver cancer progression
            using animal models.
          </li>
          <li>
            Explore the development of inhibitors to counteract the
            pro-metastatic effects of TBBPA in liver cancer.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-photoresist",
    title: "Photoresist Production Optimization",
    organization: "Merck KGaA, Darmstadt, Germany",
    timeframe: "June 2024 - September 2025",
    supervisor: "Michael Schleehahn",
    description:
      "Developed a comprehensive, data-driven AI solution to optimize the photoresist blending process in semiconductor production, overcoming extreme industrial constraints.",
    highlights: [
      "Presented to the global data science team at Merck Data Science Garage (January 2025)",
      "Evolved from a 1-step baseline to a robust 2-step decoupled architecture enforcing chemical consistency",
      "Searched 5,000+ pipeline configurations, judged by a three-stage evaluation (cross-validation → repeated random splits → independent test set)",
      "Defined a composite evaluation metric with the chemistry engineers from the tolerances the process requires, and added a bootstrap-based reliability score",
      "Top models reached 83–95% first-time-right in testing",
      "Developed a bilingual Streamlit web app with automated multi-source data ingestion and MLOps serialization",
    ],
    skills: [
      "Scikit-learn",
      "Gradient Boosting",
      "Feature Engineering",
      "Bootstrap Resampling",
      "Streamlit",
      "Plotly",
      "MLOps",
      "Palantir Foundry",
      "PDF-Miner",
    ],
    image: "/projects/photoresist.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          Presented at the{" "}
          <strong>Merck Data Science Garage (January 2025)</strong> to the
          global data science team. Developed a comprehensive, data-driven AI
          solution to optimize the photoresist blending process in semiconductor
          production. Overcoming extreme industrial constraints of small
          datasets (~200 to 300+ samples), high-noise environments, and no GPU
          infrastructure, the project evolved from a baseline 1-step
          proof-of-concept into a robust 2-step model architecture. Instead of
          relying on experience alone, engineers get candidate configurations
          together with a reliability signal, improving production
          efficiency.
        </p>

        <h3 className="text-xl font-bold mb-4 mt-8">
          Key Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          1. Data Integration & Preprocessing under High-Noise
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Developed a robust data pipeline to integrate highly unstructured
            industrial data, including{" "}
            <strong>
              Palantir Foundry databases, Excel logs, and automated PDF
              extractions via Python PDF-Miner
            </strong>
            .
          </li>
          <li>
            Addressed significant data quality issues and distribution shifts by
            implementing weighted average aggregations for duplicate
            manufacturing batches and KNN imputation for missing values.
          </li>
          <li>
            Kept evaluation honest on a small, noisy dataset with a{" "}
            <strong>three-stage protocol</strong>: cross-validated grid search,
            then repeated random splits, then an independent test set — and
            used the signal-to-noise ratio to judge what could be learned at
            all, rather than over-tuning on a few hundred samples.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          2. Advanced ML & 2-Step Architecture Evolution
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Designed and executed an exhaustive, automated model search
            pipeline, searching{" "}
            <strong>5,000+ pipeline configurations</strong> of preprocessing
            steps, feature selections, and models to find the optimal
            configuration for limited data.
          </li>
          <li>
            Evolved the system architecture from a standard 1-step model to a
            specialized <strong>2-step v2 architecture</strong>, decoupling
            H-SEMI and L-SEMI predictions. Implemented single-output regression
            for H-SEMI while mathematically deriving L-SEMI to ensure strict
            chemical ratio consistency.
          </li>
          <li>
            Evaluated a wide range of algorithms, ultimately proving that
            well-tuned traditional models (Gradient Boosting, Ridge, Random
            Forest) outperformed highly complex models in this specific
            small-sample industrial context.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          3. Domain-Driven Feature Engineering
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Conquered the "curse of dimensionality" on small datasets by
            aggressively reducing 60+ initial features to an optimal set of 5-10
            features using SelectKBest, Lasso, and mutual information
            regression.
          </li>
          <li>
            Collaborated deeply with chemical experts to engineer
            domain-specific features based on physical constraints (e.g., mass
            conservation, stoichiometric ratios), proving that{" "}
            <strong>
              domain knowledge integration yields higher accuracy than blind
              automated extraction
            </strong>
            .
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          4. Custom Evaluation Metrics & Reliability Scoring
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Defined a composite evaluation metric together with the chemistry
            engineers, built from the tolerances the process requires, since no
            standard metric matched it: it combines prediction error with the
            hit rate inside two tolerance bands.
          </li>
          <li>
            Pioneered an improved{" "}
            <strong>Bootstrap-based prediction confidence algorithm</strong>,
            providing process engineers with a reliability score (standard
            deviation of resampled predictions) for every output, rather than
            just a point estimate.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          5. Web Application Development & MLOps Integration
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-6">
          <li>
            Developed a bilingual (English/Chinese){" "}
            <strong>Streamlit web application</strong> deployed on Uptimize App
            Service, enabling engineers to easily upload multi-format data and
            interpret model predictions visually (Plotly).
          </li>
          <li>
            Implemented MLOps best practices, including model weight persistence
            via Joblib (saving the entire preprocessing and prediction pipeline
            state), ensuring reproducibility and seamless future updates.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-8">
          Outcomes and Key Learnings
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-3 mb-4">
          <li>
            <strong>First-time-right:</strong> top models reached{" "}
            <strong>83–95% first-time-right</strong> in testing.
          </li>
          <li>
            <strong>Data Strategy Revelation:</strong> Demonstrated that in
            industrial AI, rigorous data preprocessing, domain-driven feature
            engineering, and a disciplined evaluation protocol are far more
            critical to success than algorithm complexity.
          </li>
          <li>
            <strong>Team Knowledge & Governance:</strong> Established a
            standardized AI workflow and documentation framework, paving the
            way for scalable industrial AI applications within Merck.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-lab-reservation",
    title: "Full-Stack Laboratory Equipment Reservation System",
    organization: "Merck KGaA, Darmstadt",
    timeframe: "May 2024 - September 2025",
    supervisor: "Hans-Martin Körber",
    description:
      "Built and launched a company-wide full-stack lab-booking web app from scratch, replacing a Power App + Power Automate booking workflow, with Litestream replication to AWS S3 and Docker CI/CD.",
    highlights: [
      "Built and launched a company-wide lab-booking web app from scratch, replacing a Power App + Power Automate booking workflow; planned for 50+ users",
      "Booking logic: administrator approval by e-mail, first-come-first-served locking, automatic rejection on timeout, and reminders",
      "Developed a responsive Vue.js 3 + Vuetify frontend with custom theming and localization",
      "Built a high-performance FastAPI + Tortoise ORM backend",
      "Engineered database replication to AWS S3 using Litestream via Foundry",
      "Integrated corporate SSO authentication using Palantir Foundry Dev Tools",
      "Multi-stage Docker build; image pushed to AWS ECR and run on Merck's Uptimize App Service (AWS) / EC2, with Azure DevOps CI/CD",
    ],
    skills: [
      "Python",
      "FastAPI",
      "Vue.js 3",
      "SQLite",
      "Litestream",
      "Docker",
      "AWS (EC2/S3)",
      "Azure DevOps",
      "SSO Integration",
    ],
    image: "/projects/booking.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-4 leading-relaxed">
          Developed a comprehensive full-stack web application for laboratory
          equipment reservation,{" "}
          <strong>
            replacing a Power App + Power Automate booking workflow
          </strong>
          . I built it from scratch and launched it company-wide at Merck KGaA,
          planned for more than 50 users.
        </p>

        <h3 className="text-xl font-bold mb-3 mt-6">Tech Stack</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            <strong>Backend:</strong> Python 3.12, FastAPI, Tortoise ORM, Aerich
          </li>
          <li>
            <strong>Frontend:</strong> Vue.js 3, Vite, Vuetify, Pinia, Vue
            Router
          </li>
          <li>
            <strong>Database:</strong> SQLite with Litestream for replication to
            AWS S3 via Foundry
          </li>
          <li>
            <strong>Authentication:</strong> SSO integration with Foundry
          </li>
          <li>
            <strong>Deployment:</strong> Docker, AWS EC2, Azure DevOps, Uptimize
            App Service
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Full-Stack Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Developed a responsive frontend using Vue.js 3 and Vuetify, with
            custom theming and localization.
          </li>
          <li>
            Built a high-performance backend API using FastAPI and Tortoise ORM.
          </li>
          <li>
            Implemented the reservation logic and device management: after a
            booking, administrators are notified by e-mail to confirm;
            first-come-first-served locking; automatic rejection on timeout;
            reminders.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          2. Advanced UI/UX Design
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Created an interactive calendar view for reservation scheduling.
          </li>
          <li>
            Developed custom components for device browsing, search, and
            reservation management.
          </li>
          <li>Implemented light and dark themes and multi-language support.</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          3. Database and Data Management
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Utilized SQLite for local data storage with Tortoise ORM for
            database operations.
          </li>
          <li>
            Implemented{" "}
            <strong>
              Litestream for database replication to AWS S3 bucket on Foundry
            </strong>
            , keeping the data durable in a stateless containerized
            environment.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          4. Authentication and Security
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>Integrated SSO authentication using Foundry Dev Tools.</li>
          <li>
            Implemented secure token-based authentication flow and user
            management system.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          5. DevOps and Deployment
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Created a multi-stage Dockerfile for optimized container builds.
          </li>
          <li>
            Pushed the Docker image to AWS ECR and ran it on Merck&apos;s
            Uptimize App Service (on AWS) / AWS EC2.
          </li>
          <li>Set up CI/CD pipelines with Azure DevOps.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-pigment-production",
    title: "Pigment Production Optimization (FRED 2.0)",
    organization: "Merck KGaA, Gernsheim",
    timeframe: "October 2023 - March 2024",
    supervisor: "Michael Schleehahn",
    description:
      "Award-winning project optimizing pigment manufacturing. In a six-person project team I built the asynchronous pipelines that extract fragmented legacy data, and the analysis that separated meaningful operator interventions from 'panic-driven' ones.",
    highlights: [
      "The project team (six people) earned the Surface Gernsheim Award 2024 for efficiency",
      "Engineered an asynchronous Python pipeline to synchronize fragmented time-series data across legacy Aspen servers",
      "Navigated dozens of scattered database tables to accurately locate sensors and production phases per batch",
      "Built phase-detection algorithms tuned per pigment class",
      "The frequency, magnitude and timing of manual setpoint changes separated meaningful interventions from panic-driven ones — evidence that less unnecessary intervention meant steadier yield",
      "Built the Aspen data retrieval tool: batching, async and concurrent requests, resumable runs — what previously took 4–5 hours now completes in about 40 minutes",
    ],
    skills: [
      "Python",
      "SQL",
      "Aspen Data Extraction",
      "Time Series Analysis",
      "Phase Detection",
      "Process Optimization",
      "Collaborative Data Science",
    ],
    image: "/projects/fred.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-4 leading-relaxed">
          FRED 2.0 optimized pigment production at Merck in Gernsheim,
          Germany: it improved production efficiency, saved costs, and made the
          operators&apos; work easier.{" "}
          <strong>
            The six-person project team earned the Surface Gernsheim Award 2024
            (Efficiency).
          </strong>{" "}
          My part was the data pipeline and the analysis.
        </p>

        <h3 className="text-xl font-bold mb-3 mt-6">
          Core Challenges & Implementation
        </h3>
        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          1. Legacy Data Pipeline Engineering
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Engineered an asynchronous Python pipeline to extract and
            synchronize fragmented time-series sensor data from legacy Aspen
            database servers.
          </li>
          <li>
            The core data challenge was navigating dozens of scattered tables to
            locate the correct sensors, production phases, and time windows for
            each batch. This required deep collaboration with chemical engineers
            to translate chemical process logic into SQL/Python extraction
            logic.
          </li>
          <li>
            Built the <strong>Aspen data retrieval tool</strong> on this line
            and later rebuilt it with FastAPI and a Streamlit front end:
            batching, asynchronous and concurrent requests, resumable runs,
            drag-and-drop Excel input and live progress in the browser. What
            previously took 4–5 hours now completes in about 40 minutes.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          2. Phase Identification & Setpoint Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Developed phase-detection algorithms tuned per pigment class,
            automatically isolating the specific phases targeted for
            optimization.
          </li>
          <li>
            Analyzed manual setpoint adjustments—including frequency, magnitude,
            and timing—to distinguish meaningful interventions from{" "}
            <strong>unnecessary, panic-driven adjustments</strong>.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-6">Business Impact</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            The frequency, magnitude and timing of manual setpoint changes
            separated meaningful interventions from panic-driven ones —
            evidence that less unnecessary intervention meant steadier yield.
          </li>
          <li>
            The project improved production efficiency, saved costs and made
            the operators&apos; work easier; the project team earned the
            Surface Gernsheim Award 2024 for efficiency.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-parteck-optimization",
    title: "Pharmaceutical Production Optimization (Parteck®)",
    organization: "Merck KGaA, Darmstadt",
    timeframe: "December 2023 - April 2024",
    supervisor: "Michael Schleehahn",
    description:
      "Optimized life science production processes for Parteck excipients, utilizing NGBoost for uncertainty quantification and process optimization.",
    highlights: [
      "Analyzed key pharmaceutical production parameters (spray conditions, air flow, bed heights)",
      "Applied Box-Cox transformations and multiple scaling methods for skewed manufacturing data",
      "Developed and compared Linear Regression, Random Forest, Gradient Boosting, SVR, Neural Networks, and PLS",
      "Implemented NGBoost to provide calibrated confidence intervals alongside predictions",
      "Created interactive Plotly dashboards for monitoring key process parameters",
      "Conducted cross-product comparative analysis to identify shared patterns across multiple product lines",
    ],
    skills: [
      "Python",
      "NGBoost",
      "Machine Learning",
      "Uncertainty Quantification",
      "Statistical Analysis",
      "Fluid Bed Processing",
      "Pharmaceutical Manufacturing",
    ],
    image: "/projects/parteck.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          As part of the Data Sciences team at Merck KGaA, we worked on
          optimizing a life science production process (specifically fluid bed
          processing of Parteck® excipients), applying machine learning and data
          analysis techniques to the production parameters. This was a team
          project; the points below describe what we did.
        </p>

        <h3 className="text-xl font-bold mb-4">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Comprehensive Process Parameter Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Analyzed key production parameters including spray conditions, air
            flow, temperatures, bed heights, and equipment-specific settings.
          </li>
          <li>
            Developed understanding of parameter interactions and their
            influence on product quality.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          2. Advanced Data Analysis and Preprocessing
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Utilized Python (Pandas, NumPy) for data manipulation and analysis
            of complex manufacturing data.
          </li>
          <li>
            Implemented preprocessing techniques including various scaling
            methods and Box-Cox transformation for skewed data.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          3. Machine Learning Model Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Developed and compared multiple regression models (Linear
            Regression, Random Forest, Gradient Boosting, SVR, Neural Networks,
            PLS Regression) to predict and optimize process outcomes.
          </li>
          <li>
            Implemented ensemble methods and <strong>NGBoost</strong> for
            improved accuracy and uncertainty quantification—providing
            calibrated confidence intervals that enabled process engineers to
            assess{" "}
            <strong>
              when to trust automated recommendations and when manual oversight
              is warranted
            </strong>
            .
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          4. Model Evaluation and Process Optimization
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Evaluated models using various metrics to ensure accurate prediction
            of critical quality attributes.
          </li>
          <li>
            Optimized model hyperparameters and provided data-driven insights
            for process improvements.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          5. Data Visualization and Reporting
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Created interactive visualizations and dashboards using Plotly and
            Matplotlib for monitoring key process parameters and model
            predictions.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          6. Cross-Product Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Conducted comparative analysis between different products to
            identify common patterns and unique characteristics.
          </li>
          <li>
            Explored unified modeling approaches applicable across multiple
            product lines.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "count-finance-website",
    title: "Count Finance Website: Design, Build and Delivery",
    organization: "Count Finance (freelance)",
    timeframe: "July 2026 - September 2026",
    description:
      "Redesigned and rebuilt the public website of Count Finance, a UK personal-finance app company: design specification, front end, static site and deployment hand-off. The client signed it off and the site is live.",
    highlights: [
      "Replaced the client's previous Webflow site: I owned the design specification, page structure, features and engineering, from landing-page prototype to final hand-off",
      "Final delivery: a static export of 16 pages (6 pages and 10 legal documents); an earlier round shipped a 12-question Money Type quiz, a triage page and 18 analytics events",
      "Compliance built into the code: analytics tags load only after the visitor accepts, every figure carries its source next to it, and legal texts are reproduced verbatim from the client",
      "Accessible by design: 375px baseline, intact at 360px, WCAG 1.4.10 reflow down to 320px, and reduced-motion support",
      "Spec-driven development with coding agents: I wrote the specification and a staged build order; each stage was implemented by a coding agent and reviewed by me before commit",
    ],
    skills: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "Static Export",
      "Cloudflare Workers",
      "GA4",
      "Accessibility",
    ],
    image: "/projects/count-finance.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          A freelance project for{" "}
          <LinkPreview
            url="https://count-finance.com/"
            className="text-[#FD6142] hover:underline"
          >
            Count Finance
          </LinkPreview>
          , a UK personal-finance app company: a full rebuild of their public
          website, replacing the previous Webflow site. I did the design,
          planning and feature definition and was responsible for the
          engineering, from the first landing-page prototype in July 2026 to the
          final delivery in September 2026, which the client signed off.
        </p>

        <h3 className="text-xl font-bold mb-3 mt-6">What I Delivered</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            A design specification organizing the pages along an emotional
            arc (Hope → Reality → Answer → Proof → Action), design tokens, a
            design-system document, a data-visualization spec, a content and
            compliance source table, an analytics plan, and deployment and
            hand-over documentation.
          </li>
          <li>
            The first delivery (August 2026): 14 pages, 9 legal documents
            converted from PDF into pages, a 12-question Money Type quiz with 6
            outcomes, a triage page sorting 11 answers into three groups, 18
            analytics events and 37 components.
          </li>
          <li>
            The final delivery (September 2026): 6 pages plus 10 legal
            documents, 16 statically exported pages in all.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-6">Engineering</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Next.js 16 (App Router, static export), React 19, TypeScript,
            Tailwind CSS 4, Framer Motion and lucide-react; marked converts
            the legal documents and sharp runs the image pipeline at build
            time.
          </li>
          <li>
            The five target charts are hand-written inline SVG with Framer
            Motion, and the carousel is hand-written scroll-snap — no UI,
            chart, carousel or cookie-consent libraries.
          </li>
          <li>
            <strong>Compliance as code structure:</strong> financial promotion
            is regulated, so the GA4 tag is not on the page until the visitor
            clicks Accept; every figure has its source recorded next to it, so
            changing a number is a compliance decision; internal notes are
            stripped at build time; legal texts are reproduced verbatim.
          </li>
          <li>
            <strong>Accessibility:</strong> designed at a 375px baseline,
            intact at 360px, reflowing down to 320px per WCAG 1.4.10; under{" "}
            <code>prefers-reduced-motion</code> animations go straight to their
            final state.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-6">How It Was Built and Handed Over</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Spec-driven development with coding agents: I wrote the
            specification and a staged build order; each stage was implemented
            in a fresh coding-agent session and reviewed by me before it was
            committed, and the next stage waited for that review.
          </li>
          <li>
            Hand-over to non-developers: a deployment guide with one action
            per step for Cloudflare Workers static assets; the delivery listed
            three pre-launch regulatory risks separately for the client to
            confirm.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "nmy-llm-assistant",
    title: "Voice-Interactive LLM Assistant",
    organization: "NMY Mixed Reality Studio",
    timeframe: "June 2023 - September 2023",
    supervisor: "Peter Eschler",
    description:
      "Built a knowledge-base voice assistant prototype (RAG) intended for enterprise VR/AR use, and delivered a pragmatic hardware-scalability assessment that concluded the engagement.",
    highlights: [
      "Built a voice-interactive chatbot using LLaMA 2, LangChain, and ChromaDB for knowledge base embedding",
      "Implemented text-to-speech functionality using Bark to enable voice interaction",
      "Developed and tested the pipeline locally on an NVIDIA 4070Ti GPU with 7B open-source models",
      "Identified critical scalability constraints: available hardware was insufficient for multi-user inference with TTS overhead",
      "Provided pragmatic architectural recommendations that led to a mutual agreement to conclude the engagement",
    ],
    skills: [
      "Open LLMs",
      "LLaMA 2",
      "LangChain",
      "ChromaDB",
      "Streamlit",
      "Bark TTS",
      "Strategic Planning",
    ],
    image: "/projects/llm.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          During my time at NMY Mixed Reality Studio, I collaborated with VR/AR
          developers to build a voice-interactive assistant using large language
          models (LLMs) for enterprise users. The assistant was designed to
          answer questions based on a vector knowledge base specific to the
          company's business knowledge using Chroma.
        </p>

        <h3 className="text-xl font-bold mb-4">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Project Proposal and Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Proposed a virtual scene where users can interact with an assistant
            to acquire information conversationally.
          </li>
          <li>
            Expanded the project blueprint to include a virtual character
            capable of processing comprehensive information and responding with
            both verbal and physical actions.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          2. Technical Implementation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Utilized <strong>LLaMA 2, LangChain, and Streamlit</strong> to
            create a chatbot with a fixed knowledge base.
          </li>
          <li>
            Experimented with Vicuna 7b and LLaMA 2 7b models, integrating them
            with LangChain to achieve Knowledge Base Embedding.
          </li>
          <li>
            Developed and tested the chatbot on a system with an{" "}
            <strong>NVIDIA 4070ti GPU</strong>, which limited us to running 7b
            models.
          </li>
          <li>
            Implemented text-to-speech functionality using <strong>Bark</strong>{" "}
            to enable voice interaction.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          3. Project Architecture and Strategy
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            Provided strategic suggestions for the project architecture,
            focusing on AI components and their potential integration into VR/AR
            applications.
          </li>
          <li>
            Outlined the necessary steps for defining features, estimating
            workloads, and determining critical functions for the development
            process.
          </li>
          <li>
            Suggested the team configuration for future development, emphasizing
            the need for expertise in robotics, VR development, and AI-boost
            frameworks.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">Challenges and Insights</h3>
        <p className="mb-4 leading-relaxed">
          I recognized that providing a local LLM-based assistant for enterprise
          users required more computational resources than we had available. An
          NVIDIA 4070ti and 7b models were insufficient, especially when
          combined with the additional load of text-to-speech conversion using
          Bark. The VR/AR devices' computational limitations further compounded
          the issue.
        </p>
        <p className="mb-4 leading-relaxed">
          Given the current computational constraints, it was challenging to
          serve even a single user effectively, let alone multiple users
          simultaneously, which is essential for a viable enterprise solution.
          This situation raised concerns about the scalability and profitability
          of the solution,{" "}
          <strong>
            as it seemed to turn into a hardware-selling model benefiting GPU
            manufacturers like NVIDIA rather than a sustainable software
            service.
          </strong>
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Career Insight:</strong> Applying pragmatic technical
          judgment, I identified these fundamental scalability constraints
          early. This transparent architectural assessment led to a mutual
          agreement to conclude the engagement, underscoring my focus on
          delivering technically feasible and commercially sound AI solutions
          rather than chasing unscalable hype.
        </p>
      </div>
    ),
  },
  {
    id: "startup-bsetech",
    title: "Co-founder & Product Lead: Wellness Industry Startup",
    organization: "Hangzhou BseTech Co.,Ltd.",
    timeframe: "October 2015 - January 2016",
    supervisor: "Bancheng Zhou",
    description:
      "Led product strategy from 0 to 1, successfully negotiating a ¥2M angel investment and launching two consumer and B2B mobile apps on the App Store.",
    highlights: [
      "Negotiated a ¥2M angel investment at 20% equity dilution with Shanghai-based VC (Youtang Capital)",
      "Led product strategy from company registration to dual App Store launches",
      "Independently designed information architecture, UX/UI flows, and prototypes",
      "Coordinated cross-functional execution across technical, design, and marketing teams",
      "Managed third-party SDK integrations (BeeCloud, Mob ShareSDK, JPush) and defined API formats",
    ],
    skills: [
      "Product Management",
      "Investor Relations",
      "UX/UI Design",
      "App Store Launch",
      "Business Strategy",
      "Cross-functional Leadership",
    ],
    image: "/projects/treat.webp",
    category: "corporate",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          As the co-founder and product lead of a wellness industry startup,
          I oversaw every step of the process from company registration to
          launching the initial apps. My responsibilities included market
          research, mobile app design, development, testing, and investor
          outreach.
        </p>

        <h3 className="text-xl font-bold mb-4">Detailed Implementation</h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Market Research and Planning
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Conducted market research and led the marketing team on commercial
            visits, meeting with industry managers to gain insight into the
            wellness industry in Hangzhou.
          </li>
          <li>
            Planned user-end and to-B-end apps, designed the information
            architecture and user experience, and created prototypes.
          </li>
          <li>
            Coordinated development progress among technical, design, and other
            team members.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          2. Product Design and Prototyping
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Designed the mobile apps and managed the development process,
            ensuring a seamless user experience.
          </li>
          <li>
            Created detailed prototypes and wireframes to visualize the apps'
            design and functionality.
          </li>
          <li>
            Focused on interaction design to ensure intuitive and user-friendly
            interfaces.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          3. Technical Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Assisted the technical supervisor in developing an LBS location
            service plan.
          </li>
          <li>
            Investigated third-party platforms and payment tools, including
            BeeCloud iOS SDK, Mob ShareSDK, Mob SMS CAPTCHA SDK, and JPush iOS
            SDK.
          </li>
          <li>
            Created test samples and defined the final data formats with backend
            engineers.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          4. Product Testing and Feedback
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Worked closely with customers, business owners, and technicians to
            refine app features and functionalities.
          </li>
          <li>
            Tested the prototypes by visiting stores before launch to gather
            feedback and make necessary adjustments.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          5. Promotion and Launch
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Collaborated with marketers to develop a promotion plan targeting
            business owners.
          </li>
          <li>
            Attended startup classes and industry events, such as the Small
            Dining Table Startup Class and the Apsara Conference, to connect
            with investors and entrepreneurs and gain insights into different
            business models.
          </li>
          <li>
            Launched the Treat app and Treat for Business Owner app on the App
            Store China in January 2016.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          6. Investor Outreach and Business Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            Met with investors and pitched the business plan,{" "}
            <strong>
              negotiating a ¥2,000,000 RMB angel investment at 20% equity
              dilution with Shanghai-based VC (Youtang Capital)
            </strong>
            ; the investment arrived after I had left the company.
          </li>
          <li>
            Engaged with different managers in the wellness industry to explore
            potential collaborations and partnerships.
          </li>
          <li>
            Developed and refined the business plan, incorporating feedback from
            industry experts and potential investors.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2">Project Outcome</h3>
        <p className="mb-6 leading-relaxed">
          The Treat app and Treat for Business Owner app were launched on the
          App Store China in January 2016. Despite initial success, the project
          was terminated later that year due to market challenges and strategic
          pivots.
        </p>

        <div className="bg-[#fbf3e5]/60 p-5 rounded-lg border-l-4 border-[#C19A49]">
          <h4 className="text-lg font-bold mb-2 text-[#534021]">
            Key Insight & Career Pivot
          </h4>
          <p className="text-sm md:text-base leading-relaxed text-[#333333]">
            This journey proved my ability to transform a technical concept into
            a commercial entity and handle high-level investor negotiations.
            However, successfully pushing the project to a multi-million
            valuation during its funding window made me realize that{" "}
            <strong>
              the future moats of tech businesses will not lie in basic app
              functionality, but in the depth of their core algorithms and AI
              capabilities
            </strong>
            . This foundational insight directly drove my decision to exit and
            pivot towards deep learning and advanced computer vision research.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "ai-powered-portfolio",
    title: "Personal Website: yili-dev.com",
    organization: "Personal Project",
    timeframe: "February 2025 - March 2025, revised September 2026",
    supervisor: "",
    description:
      "Developed a comprehensive personal portfolio website that combines modern web development technologies with advanced AI image generation techniques.",
    highlights: [
      "Generated a personalized 3D Pixar-style avatar using Stable Diffusion 1.5 with ComfyUI workflow and IPAdapter",
      "Built the website using Next.js, Tailwind CSS, and Framer Motion for optimized performance and engaging animations",
      "Developed advanced UI architecture with BentoGrid pattern for flexible, modular component layout",
      "Deployed the static website to Cloudflare Pages, which builds and publishes every push to main",
      "Revised in September 2026: audited every claim against my own records, then fixed facts and wording, added a Publications section, and improved SEO and sharing previews",
    ],
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Stable Diffusion",
      "ComfyUI",
      "IPAdapter",
      "LoRA",
      "Git",
      "CI/CD",
      "Cloudflare Pages",
      "UI/UX Design",
    ],
    image: "/projects/portfolio.webp",
    category: "personal",
    content: (
      <div>
        <p className="mb-4">
          This project combines modern{" "}
          <span className="font-semibold">web development technologies</span>{" "}
          with advanced{" "}
          <span className="font-semibold">AI image generation techniques</span>{" "}
          to create a distinctive personal brand presence. The portfolio
          showcases both frontend development capabilities and expertise in
          leveraging AI models for creative content generation. I built it in
          February–March 2025; in September 2026 I audited every fact on it
          against my own records and revised it in batches — facts and
          wording, positioning, a new Publications section, then SEO, sharing
          previews and performance.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. AI-Generated Persona Creation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Utilized Stable Diffusion 1.5 with ComfyUI workflow to generate a
            personalized 3D Pixar-style avatar
          </li>
          <li>
            Implemented IPAdapter for face feature encoding to maintain
            consistent facial characteristics
          </li>
          <li>
            Applied custom LoRA models from Civitai to enhance stylistic
            qualities and visual coherence
          </li>
          <li>
            Created a visual identity that bridges professional presentation
            with creative personality
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Frontend Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Built the website with the Next.js App Router as a fully static
            export; the content is static and typed, and nothing is fetched at
            runtime
          </li>
          <li>
            Implemented responsive design principles using Tailwind CSS for
            efficient styling
          </li>
          <li>
            Enhanced user experience with sophisticated animations via Framer
            Motion including sequenced entrance animations, parallax effects,
            and continuous micro-interactions
          </li>
          <li>
            Developed advanced UI architecture using BentoGrid pattern for
            flexible, modular component layout
          </li>
          <li>
            Integrated UI component libraries (Magic UI, Aceternity UI) for
            polished visual elements
          </li>
          <li>
            Implemented animated backgrounds (FlickeringGrid, BackgroundBeams)
            for visual interest
          </li>
          <li>
            Implemented scroll-triggered animations and view transitions with
            IntersectionObserver pattern
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. DevOps and Deployment
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>Established version control workflow using Git and GitHub</li>
          <li>
            Connected the GitHub repository to Cloudflare Pages, which builds
            and deploys every push to main
          </li>
          <li>
            Deployed the static website to Cloudflare Pages for global CDN
            distribution
          </li>
          <li>
            Optimized loading speed and performance through code splitting and
            lazy loading
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Challenges and Solutions
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Addressed performance issues with complex animations by implementing
            selective rendering and view-based animation triggers
          </li>
          <li>
            Optimized large image assets through next/image component with
            priority loading and responsive sizing
          </li>
          <li>
            Balanced visual complexity with performance through z-index layering
            and conditional rendering
          </li>
          <li>
            Implemented progressive enhancement strategy for different device
            capabilities
          </li>
          <li>
            Developed a modular component structure with abstracted
            functionality to facilitate future updates
          </li>
          <li>
            Used CSS variables and theme constants to maintain visual
            consistency across components
          </li>
          <li>
            Optimized motion animations with staggered loading and reduced
            motion options
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Outcome</h3>
        <p className="mb-4">
          The project resulted in a distinctive personal brand presence that
          effectively communicates technical capabilities and creative approach.
          The website serves as both a portfolio showcase and a practical
          demonstration of frontend development and AI application skills.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Enhancements</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            Rebuild the Technical Arsenal screen around measurements from my
            own projects
          </li>
          <li>Add research notes and long-form project deep-dives</li>
        </ul>
        <p className="mt-6">
          Visit my{" "}
          <LinkPreview
            url="https://yili-dev.com/"
            className="text-[#FD6142] hover:underline"
          >
            portfolio website
          </LinkPreview>{" "}
          to see this project in action. The complete source code is available
          in my{" "}
          <LinkPreview
            url="https://github.com/liyifreddy/portfolio"
            className="text-[#FD6142] hover:underline"
          >
            GitHub repository
          </LinkPreview>
          .
        </p>
      </div>
    ),
  },
  {
    id: "open-source-agent-tools",
    title: "Open-Source Tools for Multi-Agent Research Runs",
    organization: "Personal · open source (MIT)",
    timeframe: "October 2026",
    description:
      "Two small open-source tools for running many AI coding agents on one machine and one git working tree — each written in response to a real incident.",
    highlights: [
      "wombat-gate: a commit queue for AI agents sharing one git repository — they wait their turn, and each commits only the paths it names; the repository's git configuration is left untouched",
      "dingo-pack: heavy-job slots and memory limits for many agents on one machine — heavy jobs wait for memory and run under a memory cap — plus a session roster to restore agents after a crash",
      "Each tool answers a real incident: agents sharing a working tree fought over git's index.lock and committed each other's staged files; the machine ran out of memory and took every session down with it",
      "I set the requirements, the design and the review; the code was written with AI coding agents",
    ],
    skills: [
      "Bash",
      "Git",
      "tmux",
      "Linux / WSL",
      "cgroups",
      "Claude Code",
      "Codex",
      "Open Source",
    ],
    image: "/projects/open-source-tools.webp",
    category: "personal",
    content: (
      <div className="text-[#333333]">
        <p className="mb-6 leading-relaxed">
          When one person runs a group of AI coding agents on a research
          project, the first bottleneck is infrastructure: git writes, memory,
          and starting and stopping sessions. I wrote each of these tools after
          something actually went wrong — find the root cause first, then turn
          the fix into a mechanism.
        </p>

        <h3 className="text-xl font-bold mb-3 mt-6">wombat-gate</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            A commit queue for agents sharing one git repository: sessions
            wait for the same local lock, and each commits only the paths it
            names. It does not change the repository&apos;s git configuration.
          </li>
          <li>
            Written after several sessions sharing one working tree fought
            over git&apos;s <code>index.lock</code> and swept up files another
            session had staged.
          </li>
          <li>
            Public on{" "}
            <LinkPreview
              url="https://github.com/liyifreddy/wombat-gate"
              className="text-[#FD6142] hover:underline"
            >
              GitHub
            </LinkPreview>{" "}
            under MIT; latest release v0.6.2.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-6">dingo-pack</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Heavy-job slots on one machine: a heavy job waits until memory is
            available and then runs under a memory cap; admission uses the
            committed amount and is corrected from the measured peak after the
            first 60 seconds.
          </li>
          <li>
            A session roster to save and restore Claude Code sessions after a
            crash, plus checks for leftover sessions.
          </li>
          <li>
            Written after the machine ran out of memory, the shared drive
            dropped, and every session went down together.
          </li>
          <li>
            Public on{" "}
            <LinkPreview
              url="https://github.com/liyifreddy/dingo-pack"
              className="text-[#FD6142] hover:underline"
            >
              GitHub
            </LinkPreview>{" "}
            under MIT; latest release v0.1.1.
          </li>
        </ul>

        <p className="mb-4 leading-relaxed">
          I set the requirements, designed the tools and reviewed every change;
          the code was written with AI coding agents.
        </p>
      </div>
    ),
  },
  {
    id: "infinitas-comedy",
    title: "Founder of Infinitas Comedy Club",
    organization: "Infinitas Comedy Club",
    timeframe: "October 2022 - February 2023",
    description:
      "Founded and organized a Chinese stand-up comedy club in Germany, leading its establishment and growth through events and community building.",
    highlights: [
      "Successfully organized 8 events including actor training sessions, script readings, online webinars, and open mics",
      "Attracted approximately 40-50 participants per event, providing a platform for both new and experienced performers",
      "Established connections with leaders of Chinese stand-up comedy clubs in major international cities",
      "Created social media presence across multiple platforms, building a fan base and attracting audience and performers",
      "Designed the club's logo, performance posters, and tickets to enhance brand identity",
    ],
    skills: [
      "Event Management",
      "Community Building",
      "Marketing",
      "Graphic Design",
      "Leadership",
      "Collaboration",
      "User Research",
    ],
    image: "/projects/club-logo.webp",
    category: "social",
    content: (
      <div>
        <p className="mb-4">
          I founded and organized Infinitas Comedy, a Chinese stand-up comedy
          club in Germany, and led its establishment and growth, organizing
          various events and building a community of enthusiasts and
          performers. I stepped back in February 2023; the club is still
          running.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Event Organization</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Successfully organized 8 events, including actor training sessions,
            script reading meetings, online webinars, and open mics.
          </li>
          <li>
            Attracted approximately 40-50 participants per event, providing a
            platform for both new and experienced performers.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Community Building</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Established connections with leaders of Chinese stand-up comedy
            clubs in New York, Paris, London, Tokyo, and Silicon Valley.
          </li>
          <li>
            Built the club from scratch with their help, finding free venues and
            equipment to provide opportunities for practice and performance.
          </li>
          <li>
            Led members from beginners to more experienced performers, fostering
            growth and transformation within the community.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Marketing and Promotion
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Created social media accounts on multiple platforms, building a fan
            base and attracting a large audience and enthusiasts to perform.
          </li>
          <li>
            Designed the club's logo, initial performance posters, and tickets
            to promote events and enhance the club's brand identity.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          4. Collaboration and Networking
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Networked with industry leaders and other comedy clubs to gain
            insights and support for the club's development.
          </li>
          <li>
            Organized collaborative events and exchanges to provide members with
            broader exposure and learning opportunities.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          5. User Feedback and Improvement
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Designed and conducted user surveys using Google Forms to gather
            feedback from participants.
          </li>
          <li>
            Analyzed survey results to motivate and guide stand-up comedians in
            improving their performances based on audience feedback.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Project Outcome</h3>
        <p className="mb-4">
          Successfully established and grew a Chinese stand-up comedy club in
          Germany, providing a platform for performers and building a strong
          community through effective marketing and collaboration.
        </p>
      </div>
    ),
  },
  {
    id: "vuecd-media-head",
    title: "Head of Media at VÜCD",
    organization: "Der Verein der Überseechinesen in Deutschland (VÜCD)",
    timeframe: "August 2022 - Present",
    description:
      "Led media initiatives for VÜCD, promoting cultural exchange between Chinese and German communities through events, marketing, and digital content creation.",
    highlights: [
      "Helped plan and organize 'China Day' during the 25th Frankfurt Euro Finance Week in 2022",
      "Planned Chinafest 2022 and 2023 in Frankfurt, focusing on traditional cultural experiences",
      "Designed and organized the Infinitas Youth Arena experimental theater project with concerts and cultural salons",
      "Created social media presence and designed promotional materials using Figma, Photoshop, and Stable Diffusion AI",
      "Coordinated non-profit indoor concerts, managing themes, resources, and personnel",
    ],
    skills: [
      "Event Management",
      "Community Building",
      "Marketing",
      "Graphic Design",
      "Leadership",
      "Media Production",
      "Cultural Exchange",
      "Project Planning",
    ],
    image: "/projects/infinitas.webp",
    category: "social",
    content: (
      <div>
        <p className="mb-4">
          As a volunteer for the VÜCD, I have participated in numerous projects
          to promote cultural exchange between Chinese and German communities. I
          initiated and participated in the creation of Infinitas Youth, a youth
          organization focused on cultural and artistic activities. I
          established the organization's mission and values, and designed all
          visual identities, logos, and posters.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Event Planning and Organization
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Helped to plan and organize "China Day" during the 25th Frankfurt
            Euro Finance Week in 2022.
          </li>
          <li>
            Planned Chinafest 2022 and Chinafest 2023 in Frankfurt, focusing on
            traditional cultural experiences.
          </li>
          <li>
            Designed and organized the Infinitas Youth Arena, an experimental
            theater project, which included indoor concerts, Eastern aesthetic
            salons, dance parties, and more.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Marketing and Promotion
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Created social media accounts on multiple platforms to connect with
            potential audience.
          </li>
          <li>
            Designed promotional materials, including logos, posters, tickets,
            and social media posts to enhance the organization's brand identity.
          </li>
          <li>
            Managed targeted advertising on Meta platforms to promote events.
          </li>
          <li>
            Used Figma, Photoshop, and Stable Diffusion generative AI to create
            posters and promotional brochures.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Concert Coordination
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Planned, organized, and coordinated a series of non-profit indoor
            concerts under the Infinitas Youth Arena initiative.
          </li>
          <li>
            Managed theme selection, resource allocation, and personnel
            scheduling for the concerts.
          </li>
          <li>
            Designed event posters, set up ticket sales on Eventbrite, and
            ensured financial balance between ticket revenue and expenses for
            musicians and venues.
          </li>
          <li>
            Successfully organized 5 concerts, each attracting approximately 80
            attendees.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">4. Chinafest 2023</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Planned the format and theme of Chinafest, optimizing program
            content to enhance participant engagement and experience.
          </li>
          <li>
            Developed a detailed sponsorship plan, including exhibition booths,
            and expanded sponsorship formats to secure sufficient funding for
            the event.
          </li>
          <li>
            Used Stable Diffusion generative AI and Figma to create posters and
            promotional brochures.
          </li>
          <li>
            Chinafest 2023 was held at Roßmarkt in Frankfurt, attracting over
            100,000 participants over three days, with participation and
            sponsorship from more than 20 companies and organizations.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">5. Media Production</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Shot and planned the{" "}
            <span className="font-semibold">"Infinitas Youth Interviews"</span>{" "}
            short video series, interviewing young and interesting people from
            various fields in Germany.
          </li>
          <li>
            Produced content that discussed diverse life experiences,
            philosophies, and inspirational stories.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          6. Choir Participation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 mb-4">
          <li>
            Sing in the baritone section of the Frankfurt Chacona Youth Choir,
            part of the VÜCD.
          </li>
          <li>
            Assisted in the organization of the 23rd China-Germany Cultural
            Exchange Night Concert at the Clara Schumann Music Hall in
            Frankfurt.
          </li>
        </ul>
      </div>
    ),
  },
  // 在这里添加更多项目...
];

// 将项目标签数据导出为一个常量
export const projectTabs = [
  {
    title: "Research Projects",
    value: "research",
    content: (
      <div className="w-full bg-[#A67C3D]/80 backdrop-blur-sm p-8 rounded-xl">
        <ProjectGrid
          projects={projectsData.filter(
            (project) => project.category === "research",
          )}
        />
      </div>
    ),
  },
  {
    title: "Industry Projects",
    value: "corporate",
    content: (
      <div className="w-full bg-[#A67C3D]/90 backdrop-blur-sm p-8 rounded-xl">
        <ProjectGrid
          projects={projectsData.filter(
            (project) => project.category === "corporate",
          )}
        />
      </div>
    ),
  },
  {
    title: "Personal & Open Source",
    value: "personal",
    content: (
      <div className="w-full bg-[#A67C3D]/90 backdrop-blur-sm p-8 rounded-xl">
        <ProjectGrid
          projects={projectsData.filter(
            (project) => project.category === "personal",
          )}
        />
      </div>
    ),
  },
  {
    title: "Social Impact",
    value: "social",
    content: (
      <div className="w-full bg-[#A67C3D]/90 backdrop-blur-sm p-8 rounded-xl">
        <ProjectGrid
          projects={projectsData.filter(
            (project) => project.category === "social",
          )}
        />
      </div>
    ),
  },
];

const ProjectTabsContent: React.FC = () => {
  return (
    <div className="w-full">
      {/* 使用Tabs组件 */}
      <Tabs
        tabs={projectTabs}
        containerClassName="mb-8"
        activeTabClassName="bg-gradient-to-r from-[#C19A49]/80 to-[#B08642]/80"
        tabClassName="font-medium text-sm md:text-base "
        contentClassName=""
      />
    </div>
  );
};

export default ProjectTabsContent;
