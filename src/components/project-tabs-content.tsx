"use client";

import React from "react";
import ProjectGrid from "@/components/project-grid";
import { Project } from "@/components/project-card";
import { Tabs } from "@/components/ui/tabs";
import { LinkPreview } from "@/components/ui/link-preview";

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
      "M.Sc. thesis, TU Darmstadt — submitted 23 March 2026, defended 17 April 2026, graded 1.3 (sehr gut). Investigated how frozen, self-supervised visual representations can be integrated into continuous robotic manipulation policies under standard hardware constraints (single RTX 2080 Ti).",
    highlights: [
      "Structure beats capacity: object-centric slots generalize +22.4pp over the strongest DINO baseline (55.0% vs 32.6% for global [CLS]) under matched conditions, same policy, no fine-tuning",
      "Reached 68.7 ± 4.2% SR on ManiSkill3 PickCube-v1, within 3pp of a privileged 3D-oracle bound, on a single RTX 2080 Ti with no encoder fine-tuning",
      "Adapted the SPOT encoder (frozen DINO ViT-B/16 + Slot Attention) as a structural bottleneck compressing dense features into object-centric slots",
      "Failure taxonomy identified Near-Miss placement — not grasping — as the dominant failure mode under the pure-visual condition; a deployable 2D spatial anchor plus native-resolution rendering lifted success from 31.0% to 68.7%",
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
          achieve high success rates but rely on end-to-end visual fine-tuning,
          which requires high-end hardware (RTX 4090, 24 GB VRAM) and large
          demonstration datasets. Frozen-encoder alternatives avoid this cost
          but perform poorly without further architectural support (3% SR on
          PickCube-v1 with standard BC).
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
            The full pipeline runs on a single RTX 2080 Ti (11 GB VRAM).
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
          <li>Dual fixed-camera RGB setup (Base + Side camera, 224×224).</li>
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
            <strong>Structure beats capacity:</strong> object-centric slot
            grouping outperforms all DINO baselines under matched token budgets
            (+22.4pp), while a 16×-larger dense patch grid gives no gain — the
            driver is representational structure, not token count.
          </li>
          <li>
            <strong>Explicit 2D spatial grounding</strong> (projected from a
            known 3D target, and therefore privileged rather than
            self-supervised) targets the Near-Miss placement bottleneck.
            Near-Miss failures fall from 31.0% under the pure-visual condition
            to 21.0% with the deployable 2D anchor, and reach 2.5% only under a
            privileged 3D goal. No-Grasp failures stay in the same range across
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
            the dominant bottleneck.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3">Technical Infrastructure</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            <strong>Simulator:</strong> ManiSkill3 (SAPIEN), Franka Panda robot,
            PickCube-v1 and StackCube-v1.
          </li>
          <li>
            <strong>Training:</strong> SLURM cluster (RTX 2080 Ti, 11 GB),
            PyTorch, offline feature caching pipeline.
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
      "Generated over 36,000 physically-based rendering (PBR) images of YCB objects using BlenderProc",
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
          This project aims to enhance the style of 6D pose estimation while
          preserving its cues. I achieved this by generating physically-based
          rendering (PBR) data of YCB objects using BlenderProc and modifying
          CoCosNet-v2 for image translation and CosyPose for pose estimation
          using PyTorch and OpenCV. The project was deployed on the Slurm
          cluster of Fraunhofer IGD and used Docker to manage containers.
        </p>

        <h3 className="text-xl font-bold mb-4">Detailed Implementation</h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Data Generation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Generated <strong>over 36,000</strong> PBR data images for BOP YCB
            objects (drill, bowl, and mug) using BlenderProc. This included
            transformation matrices, depth maps, and masks from BopToolKit under
            different rendering textures, illumination conditions, angles, and
            scales.
          </li>
          <li>
            Employed Blender 2.93 and BlenderProc2 to create datasets with image
            size 1280x1280, generating 10k training images and 2k validating
            images per object.
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
            to delays and necessitating the use of external ECS servers with
            NVIDIA T4 GPUs.
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
    title: "Semantic Segmentation Diffusion Models",
    organization: "Graphisch-Interaktive Systeme (GRIS Lab)",
    timeframe: "March 2023 - October 2023",
    supervisor: "Yannik Frisch",
    description:
      "Improved semantic segmentation accuracy in medical images using diffusion models to generate high-quality synthetic data for augmenting.",
    highlights: [
      "Utilized MNIST-Extended and Breast Cancer Semantic Segmentation datasets for training and validation",
      "Generated synthetic images and segmentation masks using VAE and LDM techniques to enhance training data",
      "Implemented a VAE with segmentation decoder and transitioned to Latent Diffusion Models for computational efficiency",
      "Developed data augmentation techniques and larger tiles to reduce overfitting and improve image quality",
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
          This project aims to improve the accuracy of{" "}
          <span className="font-semibold">semantic segmentation</span> in
          medical images using{" "}
          <span className="font-semibold">diffusion models</span>. The primary
          focus was to generate high-quality synthetic data to augment small,
          manually annotated training datasets. We explored various approaches,
          including Variational Autoencoders (VAE) and Latent Diffusion Models
          (LDM), to enhance the performance of segmentation tasks.
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
            Initial experiments with VAE on the MNIST-E dataset showed promising
            results but failed to generalize well to the BCSS dataset.
          </li>
          <li>
            Implemented data augmentation techniques and larger tiles to reduce
            overfitting, which improved image quality but not segmentation
            accuracy.
          </li>
          <li>
            Integrated image and mask inputs into the VAE, significantly
            improving reconstruction performance.
          </li>
          <li>
            Combined LDM with VAE outputs to further enhance image and mask
            quality, achieving better alignment with ground truth data.
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
            Overcame overfitting by experimenting with various data augmentation
            techniques and larger image tiles.
          </li>
          <li>
            Addressed the challenge of generating high-quality segmentation
            masks by refining the model architecture and training procedures.
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
            Investigate the integration of GAN-based approaches to further
            refine the segmentation performance.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "square-explainability",
    title: "SQuARE - Explainability Methods for QA",
    organization: "Ubiquitous Knowledge Processing Lab (UKP Lab)",
    timeframe: "October 2022 - February 2023",
    supervisor: "Haritz Puerto",
    description:
      "Improved explainability of AI models in NLP by extending explainability methods on UKP-SQuARE platform for QA pipelines.",
    highlights: [
      "Integrated BertViz into UKP-SQuARE through Vue.js and modelinference API with Docker",
      "Created a microservice to run CheckList for behavioral testing of QA models",
      "Conducted Minimum Functionality Tests for unit testing capabilities like taxonomy and vocabulary",
      "Tested BERT and RoBERTa-based QA models on Hugging Face for performance comparison",
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
          This project aims to improve the{" "}
          <span className="font-semibold">explainability</span> of AI models in
          NLP. We extended the explainability methods on UKP-SQuARE, a scalable
          platform for QA pipelines. I integrated{" "}
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
    title: "Endoscopy OOD Augmentations",
    organization: "Medical & Environmental Computing (MEC-Lab)",
    timeframe: "December 2022 - February 2023",
    supervisor: "Henry Krumb",
    description:
      "Enhanced Out-of-Distribution (OOD) detection for endoscopy images by exploring different OOD augmentation methods and image attribute shifts.",
    highlights: [
      "Implemented OOD augmentations by overlaying objects on endoscopy images with high-frequency noise extraction",
      "Applied random value and hue shifts to simulate different lighting conditions and anomalies",
      "Trained a MobileNet classifier on the Kvasir dataset, observing significant performance drops in OOD scenarios",
      "Improved realism by aligning image lighting with object lighting and optimizing overlay positions",
    ],
    skills: [
      "Medical Image Processing",
      "Out-of-Distribution Detection",
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
          This project aims to enhance Out-of-Distribution (OOD) detection for{" "}
          <span className="font-semibold">endoscopy</span> images by exploring
          different OOD augmentation methods. We implemented various image
          attribute shifts and realistic artifacts to evaluate and improve OOD
          detection methods. The code can be found on{" "}
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
      "Published in CHI'22, evaluating AR, vibrotactile, and auditory warnings for preventing collisions with pedestrians",
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
            Published in CHI'22
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
    title:
      "TBBPA regulates calcium-mediated lysosomal exocytosis and thereby promotes invasion and migration in hepatocellular carcinoma",
    organization: "Institutes of Biomedical Sciences, Shanxi University",
    timeframe: "March 2018 - November 2018",
    supervisor: "Zhuoyu Li",
    description:
      "Investigated the regulation of calcium-mediated lysosomal exocytosis and its impact on cell invasion and migration in liver cancer.",
    highlights: [
      "Conducted molecular docking simulations using protein structures from the PDB database with AutoDock Tools and AutoDock Vina",
      "Optimized docking poses using the Lamarckian genetic algorithm and visualized results with PyMOL",
      "Contributed to statistical analysis using unpaired student t-test in GraphPad Prism",
      "Research published in Ecotoxicology and Environmental Safety journal",
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
          I collaborated with a team of biochemistry researchers to investigate
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
    id: "ai-powered-portfolio",
    title: "AI-Powered Portfolio: Creating a Modern Developer Identity",
    organization: "Personal Project",
    timeframe: "February 2025 - March 2025",
    supervisor: "",
    description:
      "Developed a comprehensive personal portfolio website that combines modern web development technologies with advanced AI image generation techniques.",
    highlights: [
      "Generated a personalized 3D Pixar-style avatar using Stable Diffusion 1.5 with ComfyUI workflow and IPAdapter",
      "Built the website using Next.js, Tailwind CSS, and Framer Motion for optimized performance and engaging animations",
      "Developed advanced UI architecture with BentoGrid pattern for flexible, modular component layout",
      "Deployed the static website to Cloudflare Pages with automated CI/CD pipeline for efficient updates",
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
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          This project combines modern{" "}
          <span className="font-semibold">web development technologies</span>{" "}
          with advanced{" "}
          <span className="font-semibold">AI image generation techniques</span>{" "}
          to create a distinctive personal brand presence. The portfolio
          showcases both frontend development capabilities and expertise in
          leveraging AI models for creative content generation.
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
            Built the website using Next.js for optimized performance and
            server-side rendering capabilities
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
            Designed interactive data visualizations to showcase skills and
            project metrics
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
            Configured CI/CD pipeline for automated testing and deployment
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
          <li>Implement internationalization for multi-language support</li>
          <li>Add a headless CMS for easier content management</li>
          <li>Develop a blog section with technical articles</li>
          <li>
            Integrate more interactive elements and user engagement features
          </li>
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
    id: "merck-photoresist",
    title: "Photoresist Production Optimization",
    organization: "Merck KGaA, Darmstadt, Germany",
    timeframe: "June 2024 - September 2025",
    supervisor: "Michael Schleehahn",
    description:
      "Developed a comprehensive, data-driven AI solution to optimize the photoresist blending process in semiconductor production, overcoming extreme industrial constraints.",
    highlights: [
      "Presented to the global data science team at Merck Data Science Garage (January 2025)",
      "Awarded the Surface Gernsheim Award 2024 (Efficiency Category) & Spot Award (MyImpact@Merck)",
      "Evolved from a 1-step baseline to a robust 2-step decoupled architecture enforcing chemical consistency",
      "Automated an exhaustive model search pipeline rigorously testing over 50,000 combinations",
      "Eliminated data leakage by correcting a flawed time-series split, the single largest driver of the accuracy gain",
      "Engineered a custom, business-oriented evaluation metric balancing statistical fit with industrial tolerances",
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
          proof-of-concept into a robust 2-step model architecture. This system
          successfully replaced manual, experience-based judgments with
          automated predictions, significantly enhancing production efficiency
          and product quality.
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
            Overcame low Signal-to-Noise Ratio (SNR) environments by correcting
            the validation protocol,{" "}
            <strong>
              replacing a flawed time-series split with a randomized split
            </strong>
            . Eliminating this data leakage was the single largest driver of the
            accuracy gain — larger than any change of algorithm.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          2. Advanced ML & 2-Step Architecture Evolution
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Designed and executed an exhaustive, automated model search
            pipeline, rigorously{" "}
            <strong>testing over 50,000 combinations</strong> of preprocessing
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
            Engineered a custom, business-oriented scoring system balancing MSE,
            R², and strict industrial tolerance requirements{" "}
            <code>(0.3*MSE + 0.3*R² + 0.2*Error0.7 + 0.2*Error1.5)</code>.
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
            <strong>Significantly Improved Prediction Accuracy:</strong>{" "}
            Transformed baseline models with negative R² into highly reliable
            predictors (R² of 0.60 for M-SEMI), achieving a{" "}
            <strong>First-Time-Right (FTR) rate between 83% and 95%</strong> in
            testing.
          </li>
          <li>
            <strong>Data Strategy Revelation:</strong> Demonstrated that in
            industrial AI, rigorous data preprocessing, feature engineering, and
            proper validation splits (solving data leakage) are far more
            critical to success than algorithm complexity.
          </li>
          <li>
            <strong>Team Knowledge & Governance:</strong> Established a
            standardized AI workflow and documentation framework, significantly
            reducing onboarding time for new team members and paving the way for
            scalable industrial AI applications within Merck.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-lab-reservation",
    title: "Full-Stack Laboratory Equipment Reservation System",
    organization: "Merck KGaA, Darmstadt",
    timeframe: "April 2024 - Jan 2025",
    supervisor: "Hans-Martin Körber",
    description:
      "Developed a complete full-stack web application replacing an outdated calendar system, featuring Litestream AWS S3 replication and Docker CI/CD.",
    highlights: [
      "Built a full-stack application from scratch to replace an outdated calendar-based booking system",
      "Developed a responsive Vue.js 3 + Vuetify frontend with custom theming and localization",
      "Built a high-performance FastAPI + Tortoise ORM backend",
      "Engineered database replication to AWS S3 using Litestream via Foundry",
      "Integrated corporate SSO authentication using Palantir Foundry Dev Tools",
      "Configured Docker deployment on AWS EC2 with Azure DevOps CI/CD pipelines",
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
            replacing an outdated calendar-based booking system to solve real
            organizational bottlenecks
          </strong>
          , optimizing laboratory resource management and improving equipment
          utilization at Merck KGaA.
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
            Implemented complex reservation logic and device management
            functionalities.
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
            , ensuring zero-data-loss durability in a stateless containerized
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
          <li>Configured deployment on AWS EC2 using Docker containers.</li>
          <li>
            Set up CI/CD pipelines with Azure DevOps for automated testing and
            deployment.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-pigment-production",
    title: "Pigment Production Optimization (FRED 2.0)",
    organization: "Merck KGaA, Darmstadt",
    timeframe: "October 2023 - November 2024",
    supervisor: "Michael Schleehahn",
    description:
      "Award-winning project optimizing pigment manufacturing. Built asynchronous pipelines to extract fragmented legacy data and identified 'panic-driven' operator interventions.",
    highlights: [
      "Won the Surface Gernsheim Award 2024 (Efficiency Category) for outstanding process optimization",
      "Engineered an asynchronous Python pipeline to synchronize fragmented time-series data across legacy Aspen servers",
      "Navigated dozens of scattered database tables to accurately locate sensors and production phases per batch",
      "Developed custom phase detection algorithms tailored to specific pigment types (Iriodin, Iriotec series)",
      "Proved that reducing 'panic-driven' manual pH adjustments significantly improved yield stability",
      "Provided data-driven evidence that existing sensor and control systems were inherently robust",
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
          <strong>
            Recognized with the Surface Gernsheim Award 2024 (Efficiency
            Category)
          </strong>
          , this project (FRED 2.0) achieved significant efficiency improvements
          and cost reduction in pigment production processes at Merck,
          Gernsheim, Germany. The solution optimized the manufacturing of
          various pigments, including the Iriodin and Iriotec series.
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
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          2. Phase Identification & Setpoint Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Developed phase detection algorithms tailored to each pigment type's
            unique production characteristics, automatically isolating the
            specific phases targeted for optimization.
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
            Provided data-driven evidence that the underlying sensor and control
            systems were inherently robust, and that excessive manual
            intervention (e.g., reactive pH adjustments triggering multi-hour
            stabilization cycles) was counterproductive.
          </li>
          <li>
            Demonstrated that targeted reduction of unnecessary interventions
            directly improved yield stability, reduced production downtime, and
            lowered operator burden, leading to significant cost savings.
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
          As part of the Data Sciences team at Merck KGaA, I worked on
          optimizing a life science production process (specifically fluid bed
          processing of Parteck® excipients), applying machine learning and data
          analysis techniques to enhance manufacturing efficiency and product
          quality.
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
    id: "nmy-llm-assistant",
    title: "Voice-Interactive LLM Assistant",
    organization: "NMY Mixed Reality Studio",
    timeframe: "June 2023 - September 2023",
    supervisor: "Peter Eschler",
    description:
      "Built a knowledge-base voice assistant prototype (RAG) intended for enterprise VR/AR use, and delivered a pragmatic hardware-scalability assessment that concluded the engagement.",
    highlights: [
      "Built a voice-interactive chatbot using LLaMA 2, LangChain, and ChromaDB for knowledge base embedding",
      "Implemented text-to-speech functionality using Bark to enable voice interaction in VR",
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
      "VR/AR Architecture",
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
          As the co-founder and product manager of a wellness industry startup,
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
            Met with investors and pitched the business plan, successfully{" "}
            <strong>
              negotiating and securing a ¥2,000,000 RMB angel investment at 20%
              equity dilution with Shanghai-based VC (Youtang Capital)
            </strong>
            .
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
    id: "infinitas-comedy",
    title: "Cofounder of Infinitas Comedy Club",
    organization: "Infinitas Comedy Club",
    timeframe: "October 2022 - February 2023",
    description:
      "Co-founded and organized the first Chinese stand-up comedy club in Germany, leading its establishment and growth through events and community building.",
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
          As the co-founder and organizer of Infinitas Comedy, the first Chinese
          stand-up comedy club in Germany, I led the establishment and growth of
          the club, organizing various events and building a strong community of
          enthusiasts and performers.
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
          Successfully established and grew the first Chinese stand-up comedy
          club in Germany, providing a platform for performers and building a
          strong community through effective marketing and collaboration.
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
