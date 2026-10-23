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
          I studied how frozen visual representations affect a manipulation
          policy's generalization to object and goal placements unseen in
          training. The experiments used behavior cloning from 1,000
          motion-planner demonstrations in ManiSkill3, with PickCube-v1 as
          the main task and StackCube-v1 as a cross-task check.
        </p>
        <p className="mb-6 leading-relaxed">
          I conducted the thesis independently at TU Darmstadt and École
          Centrale de Lyon. I integrated SPOT with its official COCO
          weights, kept the encoder frozen and fed its object-centric slots
          to a causal Transformer policy. The controlled experiments
          separated representation structure, fusion, spatial grounding and
          rendering resolution. Each training job used a single RTX 2080 Ti
          or RTX 3080 Ti with 11–12 GB of memory.
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
            <strong>Action chunking:</strong> predicts 10 action steps and
            executes the first, then replans at the next observation.
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
          The table combines two experiment axes: encoder choice under fixed
          policy, goal token, 128×128 rendering and approximate calibration;
          and spatial grounding and resolution with SPOT fixed. Stability
          results are mean ± standard deviation over three independent
          300-episode evaluations of the selected checkpoint. The dense DINO
          row is a checkpoint-sweep result under a different
          memory-constrained setup.
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
          The matched encoder comparison is SPOT against global DINO and the
          4×4 patch grid. The grid uses 16 times as many tokens as global
          DINO but gives similar success. Dense 14×14 features forced T=1
          and H=1 on the 11 GB card, so that row does not isolate the effect
          of token count.
        </p>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          Key Findings
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-6">
          <li>
            <strong>Frozen representations:</strong> with the policy, goal
            token, rendering and calibration fixed, SPOT reached 55.0 ± 2.9%
            success, global DINO 32.6 ± 1.5%, and DINO patches 31.7 ± 3.0%. In
            this setting, grouping the image into object-centric slots helped
            more than adding patch tokens.
          </li>
          <li>
            <strong>Failure diagnosis:</strong> the classifier reads action
            variance, the grasp flag and TCP-to-goal distance, and assigns
            Idle, No Grasp, Drop, Near Miss or Unknown without rendering
            images. In separate 200-episode runs, Near Miss fell from 31% with
            purely visual goal information to 21% with the 2D anchor and 2.5%
            with a privileged 3D goal. No-Grasp failures were not improved.
            The 2D projection still uses the known 3D target position.
          </li>
          <li>
            <strong>Calibration and resolution:</strong> with the 2D goal
            token and SPOT fixed, exact calibration gave 58.7 ± 3.4% success
            at 128×128. With the 2D anchor, exact calibration and native
            224×224 rendering, the full system reached 68.7 ± 4.2% on one 11
            GB GPU, versus 71.7 ± 4.1% for the privileged, non-deployable 3D
            oracle.
          </li>
          <li>
            <strong>Fusion and history:</strong> parameter-free concatenation
            and bidirectional cross-attention both reached 31.0% held-out
            success; cross-attention had a train-to-test gap of about 29
            percentage points. Before the spatial-grounding fixes, T=5, 20 and
            40 all gave 6.7% in 30-episode evaluations during training.
          </li>
          <li>
            <strong>Action normalization:</strong> global Z-score
            normalization of the 9-DoF vector kept the gripper closed and gave
            0.0% success. The finger-width standard deviation was about 0.0108
            m, so normalization amplified that signal by approximately 100
            times. Truncating the input to the 7 arm joints restored 31.0 ±
            2.8%.
          </li>
          <li>
            <strong>Cross-task check:</strong> the same classifier ran
            unchanged on StackCube-v1. In a single 200-episode diagnostic run,
            72% of episodes failed to grasp cube A. The fixed side camera was
            occluded during approach, and the frozen encoder had no temporal
            memory. The aligned policy reached 5.3 ± 2.2% in the separate
            stability evaluation.
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
            ResNet18 encoder immediately ran out of memory on the 11 GB card, so a
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
            <strong>Thesis and paper:</strong> the thesis was graded 1.3 (sehr gut). A condensed, reorganized version was accepted as a first-author, peer-reviewed poster at the RSS 2026 Workshop From Perception to Action (non-archival). <LinkPreview url="https://arxiv.org/abs/2607.09825" className="text-[#FD6142] hover:underline">Paper</LinkPreview> · <LinkPreview url="https://openreview.net/forum?id=2HyzYL710J" className="text-[#FD6142] hover:underline">OpenReview</LinkPreview>.
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
            Generated 36,000+ physically based rendered images of three YCB
            objects: drill, bowl and mug. BlenderProc supplied precise 6D pose
            annotations for the synthetic data.
          </li>
          <li>
            Employed Blender 2.93 and BlenderProc2 to create datasets with image
            size 1280x1280, generating 10k training images and 2k validating
            images per object (10 textures for training; validation adds 5
            unseen ones), about two days per object on one node.
          </li>
          <li>
            Chroma-keyed supervisor-provided BOP videos of 21 YCB objects in
            DaVinci Resolve 18 to prepare the real-image side of the
            experiments.
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
            Added a repose dataset mode and loader, with 3D arrows as a pose
            prior. I resolved the environment dependencies to run Python 3.8,
            CUDA 11.0 and batch size 4 on one GPU.
          </li>
          <li>
            Evaluated PITI and Paint by Example, and tried both the official
            and an unofficial DragGAN implementation as alternative image-translation approaches.
          </li>
          <li>
            In these experiments, human-centric models relying on OpenPose
            priors did not transfer zero-shot to rigid objects without
            anatomical keypoints. This was a qualitative finding.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          3. Pose Estimation
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-6">
          <li>
            Configured CosyPose for multi-view 6D pose estimation. A working
            pose-estimation setup was one of the completed outputs, alongside
            the PBR dataset and the DeepFashion reproduction.
          </li>
          <li>
            The experiments exposed mismatched Blender and matplotlib
            coordinate systems and an incorrect interpretation of the pose
            prior. These had to be separated from the model-transfer question.
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
            The model weights and pose priors were built around human bodies.
            Rigid objects required a different way of expressing pose;
            reproducing the human-image results alone did not establish
            transfer.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">Results and Scope</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Completed the pose-annotated synthetic dataset, the CoCosNet-v2
            reproduction on DeepFashion and a working CosyPose setup.
          </li>
          <li>
            Both team members contributed throughout; I generated the PBR data
            under my cluster account and wrote most of the final report.
          </li>
          <li>
            The transfer result is qualitative. It identifies a limitation of
            the tested human-centric priors rather than a measured improvement
            in pose accuracy.
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
      "Generating paired histology images and segmentation masks with latent diffusion, as synthetic training data for medical segmentation. A three-person lab project in which each of us implemented and ran the full pipeline.",
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
          A three-person lab project (Visual Computing Lab, TU Darmstadt) in
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
            Started with MNIST-Extended as a toy problem, then moved to BCSS
            breast-cancer histology. The BCSS masks distinguish tumor, stroma,
            lymphocyte-rich tissue, necrosis or debris, and remaining tissue.
          </li>
          <li>
            The intended output was a corresponding image–mask pair. This made
            the way the mask entered the generative model a central
            experimental variable.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Model Architecture</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Implemented a VAE with a segmentation decoder for initial
            experiments on the MNIST-E dataset.
          </li>
          <li>
            Ran latent diffusion over the VAE representation and compared a
            separate segmentation decoder, a shared image–mask latent space
            and two independently encoded latent spaces.
          </li>
          <li>
            In the shared-latent route, one denoising U-Net generated the
            image and mask jointly. The pair came from the same denoising
            process.
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
            The toy-to-histology transition exposed a specific failure:
            reconstruction loss stayed near 0.2 while validation mask loss
            rose from 0.4 to 1.7. I used the two curves to isolate the mask
            branch.
          </li>
          <li>
            Binary masks, larger tiles and augmentation improved the image
            side but left the mask behavior unchanged. Sharing the latent
            space produced paired samples; separate VAEs produced noise.
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
          of the core code, including the integration of{" "}
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
            Integrated BertViz from the model-inference API through the Vue.js
            frontend, so a user could inspect attention on an individual
            question alongside results from a behavioral test suite.
          </li>
          <li>
            Connected the other team members' modules to UKP-SQuARE,
            implemented frontend interactions and wrote much of the core code.
            Docker packaged the CheckList service with the platform.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Behavioral Testing</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Built a Dockerized CheckList microservice to test BERT- and
            RoBERTa-based question-answering models by capability.
          </li>
          <li>
            Conducted Minimum Functionality Tests for unit testing capabilities
            like taxonomy and vocabulary.
          </li>
          <li>
            Ran named-entity Invariance tests to check whether a model
            maintained the expected behavior after an input change.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">3. Model Evaluation</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Tested multiple BERT and RoBERTa-based QA models hosted on Hugging
            Face.
          </li>
          <li>
            Analyzed which input categories each model handled correctly and
            where it failed, making the test outcome more specific than an
            aggregate model score.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Achievements</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Delivered the integration in a four-person research project at UKP
            Lab, supervised by Haritz Puerto.
          </li>
          <li>
            BertViz made attention available in the same frontend as
            behavioral results. Attention was an inspection aid for individual
            questions.
          </li>
          <li>
            The tests exposed capability-specific errors in the evaluated QA
            models; they provided evidence about those behaviors rather than a
            guarantee of reliability.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">What the Project Shows</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            The engineering work joined a model API, a test microservice and a
            Vue.js interface in an existing research platform.
          </li>
          <li>
            My contribution covered integration, frontend work, analysis and
            much of the core implementation. The linked model-api-v3 branch
            contains the project code.
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
      "A three-person project; the augmentations are part of MEC-Lab's open-source OOD framework FrOoDo",
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
          A three-person project at MEC-Lab. We built
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
            Trained a MobileNet classifier on Kvasir, a gastrointestinal
            endoscopy image classification dataset.
          </li>
          <li>
            Measured accuracy on the original and augmented data: 82.1% in
            distribution and 40.3% under the constructed OOD conditions.
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
            These constructed shifts substantially reduced classification
            accuracy. The result measures robustness to the tested
            augmentations and does not establish performance on unseen
            clinical data.
          </li>
          <li>
            Qualitative inspection found images that the model misclassified
            even though a human could still recognize the correct category.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Contribution and Scope</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            This was a three-person research project supervised by Henry Krumb
            at MEC-Lab. Everyone contributed; I carried out most of the
            implementation and experiments.
          </li>
          <li>
            The OpenCV augmentations were incorporated into FrOoDo, MEC-Lab's
            open-source OOD framework, at the code link above.
          </li>
          <li>
            The project combined a controlled image perturbation with a
            before-and-after classification measurement. It examined
            robustness without changing the task to segmentation.
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
      "Published as CHI 2022 Extended Abstracts (Late-Breaking Work), evaluating AR, vibrotactile, and auditory warnings for preventing collisions with pedestrians",
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
            The team compared three unimodal warnings: audio, vibration on the
            handlebar, and a visual warning displayed in Microsoft HoloLens 2.
          </li>
          <li>
            I built the visual warning and the Unity virtual urban environment
            shown through HoloLens 2.
          </li>
          <li>
            Teammates implemented the vibration motors and reaction-time
            button using the Arduino IDE and a NodeMCU ESP8266.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Experiment Setup</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            I co-ran the controlled outdoor study with the team. The 13
            participants rode on a supervised track with restricted speed.
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
            We analyzed the study with repeated-measures ANOVA in Jamovi,
            comparing the same participants across warning modalities.
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
          Study Design
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            The virtual urban scene let the team present traffic scenarios
            while participants rode on a supervised outdoor track.
          </li>
          <li>
            Button presses supplied reaction-time measurements, while Likert-scale responses captured perceived safety and warning perception.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Publication and Scope</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            The work led to a peer-reviewed short paper and poster in CHI 2022
            Extended Abstracts (Late-Breaking Work), DOI
            10.1145/3491101.3519831.
          </li>
          <li>
            The study found faster reactions to AR and audio than to
            vibration, with no significant difference between AR and audio.
          </li>
          <li>
            The result applies to this 13-participant controlled study. My
            implementation contribution was the AR visual warning and Unity
            environment.
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
          Vina. I visualized the docking results with{" "}
          <span className="font-semibold">PyMOL</span>. I contributed to{" "}
          <span className="font-semibold">statistical analysis</span> by using
          unpaired student t-test in GraphPad Prism.{" "}
          <LinkPreview
            url="https://doi.org/10.1016/j.ecoenv.2020.110255"
            className="text-[#FD6142] hover:underline"
          >
            The paper is published
          </LinkPreview>{" "}
          in Ecotoxicology and Environmental Safety (2020); I am the 5th
          author.
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
            Prepared protein structures from PDB with AutoDock Tools and ran
            TBBPA–TRPML1 molecular docking with AutoDock Vina.
          </li>
          <li>
            Used PyMOL to visualize the docking poses and protein–ligand
            interactions for discussion with the experimental team.
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
            The molecular biologists and chemists conducted the cell and
            molecular experiments; I contributed the computational docking and
            statistical analysis.
          </li>
          <li>
            Used the experimental protein measurements in the statistical
            analysis, including intracellular and extracellular CTSB and CTSD.
          </li>
          <li>
            The docking and statistical work formed part of a broader
            experimental investigation of calcium-mediated lysosomal
            exocytosis in liver cancer.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Publication and Contribution</h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-0 ">
          <li>
            The resulting paper appeared in Ecotoxicology and Environmental
            Safety in 2020. I am the 5th author.
          </li>
          <li>
            The paper links TBBPA, calcium-mediated lysosomal exocytosis, and
            invasion and migration in hepatocellular carcinoma; the DOI link
            above leads to the publication.
          </li>
          <li>
            My role was computational: molecular docking, visualization and
            statistical analysis, working with colleagues who performed the
            biological experiments.
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
          I developed the data pipeline, models and application for a
          semiconductor-production engineering team in Hsinchu, Taiwan. The
          dataset grew from
          149 samples with 71 features to more than 300 samples, and all
          modeling ran on a laptop without a GPU. I worked with chemical
          engineers to define features, physical constraints and a metric
          based on process tolerances. The application was presented at
          Merck's global Data Science Garage in January 2025.
        </p>

        <h3 className="text-xl font-bold mb-4 mt-8">
          Key Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          1. Data Integration & Preprocessing under High-Noise
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Integrated data held in Palantir Foundry with uploaded Excel
            records and automated PDF extraction, so engineers could supply
            the information needed for a blending prediction.
          </li>
          <li>
            Used scikit-learn pipelines to compare missing-value imputation,
            scaling, feature selection and regression. The inputs represented
            different physical quantities, so scaling alone could not make
            them interchangeable.
          </li>
          <li>
            Evaluated configurations in three stages: 5-fold grid search, 10
            random splits and an independent test set. Signal-to-noise
            analysis and drift checks helped assess what the small dataset
            could support.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          2. Pipeline Search and Two-Step Prediction
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Searched 704 configurations in September 2024 and 4,320 from late
            2024 to January 2025, totaling 5,000+ pipeline configurations. A
            later search in July 2025 evaluated another 360.
          </li>
          <li>
            Evolved the system architecture from a standard 1-step model to a
            specialized <strong>2-step v2 architecture</strong>, decoupling
            H-SEMI and L-SEMI predictions. Implemented single-output regression
            for H-SEMI while mathematically deriving L-SEMI to ensure strict
            chemical ratio consistency.
          </li>
          <li>
            Compared regression and boosting candidates, including AdaBoost,
            XGBoost and LightGBM. The July 2025 search selected KNNImputer,
            StandardScaler, Select10Best and GradientBoosting.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 mt-4 text-[#816334]">
          3. Domain-Driven Feature Engineering
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-2 mb-4">
          <li>
            Reduced 60+ features to 5–10 using domain knowledge and feature
            selection experiments, including SelectKBest and Lasso.
          </li>
          <li>
            Engineered features with chemical engineers using physical
            relationships such as mass conservation and stoichiometry. Their
            process knowledge identified useful inputs that generic
            transformations could not supply.
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
            Attached a reliability score to each prediction. I initially used
            bootstrap resampling, then used the standard deviation of 50
            predictions with noise-perturbed inputs.
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
            Delivered the preprocessing and prediction pipeline together with
            the Streamlit interface, connecting model inputs and results to
            the engineers' existing Foundry data workflow.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-8">
          Outcomes and Key Learnings
        </h3>
        <ul className="list-disc pl-5 md:pl-8 space-y-3 mb-4">
          <li>
            <strong>First-time-right:</strong> top models reached 83–95%
            first-time-right in testing.
          </li>
          <li>
            <strong>Process knowledge:</strong> the two-step architecture,
            feature selection and tolerance-based metric each encoded
            information supplied by engineers.
          </li>
          <li>
            <strong>Delivery:</strong> the bilingual application was in use
            by the engineering team in Taiwan when I left in September
            2025, providing predictions and reliability signals in their
            workflow.
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
      "Built and launched a company-wide lab-booking web app from scratch, replacing a Power App + Power Automate booking workflow",
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
          I built and launched an internal laboratory equipment booking
          application from scratch, replacing a Power App + Power Automate
          workflow. Users can search for equipment and request a time slot;
          administrators confirm bookings through email notifications.
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
            Built the FastAPI backend with Tortoise ORM to store equipment and
            booking records in SQLite.
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
            Created an interactive calendar for viewing equipment availability
            and requesting time slots.
          </li>
          <li>
            Developed custom components for device browsing, search, and
            reservation management.
          </li>
          <li>
            Implemented English and German interfaces, light and dark themes,
            and Pinia state management.
          </li>
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
            Replicated SQLite data with Litestream to the S3 storage behind
            Foundry, keeping booking records durable across container
            restarts.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          4. Authentication and Security
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>Integrated SSO authentication using Foundry Dev Tools.</li>
          <li>
            Implemented JWT token-based authentication alongside Foundry SSO.
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
            Built an asynchronous Python pipeline to retrieve fragmented time-series sensor data from legacy Aspen servers, with batch, phase
            and time-window information needed for the analysis.
          </li>
          <li>
            The core data challenge was navigating dozens of scattered tables to
            locate the correct sensors, production phases, and time windows for
            each batch. This required deep collaboration with chemical engineers
            to translate chemical process logic into SQL/Python extraction
            logic.
          </li>
          <li>
            Built the Aspen data-retrieval tool, then rebuilt the pipeline
            with FastAPI in March 2025. Batching, concurrent requests and
            resumable runs reduced retrieval from 4–5 hours to about 40
            minutes; a Streamlit interface accepted Excel input and showed
            live progress.
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
          In a team project at Merck, we analyzed and modeled production
          parameters for a pharmaceutical-excipient fluid-bed process. The
          work combined regression experiments with NGBoost predictions and
          calibrated intervals. The points below describe the team's work.
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
            Compared regression models for the process data, including linear
            regression, random forests, gradient boosting, SVR, neural
            networks and PLS regression.
          </li>
          <li>
            Used NGBoost to produce predictions with calibrated intervals,
            expressing uncertainty alongside the predicted process outcome.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          4. Model Evaluation and Process Analysis
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Compared predicted and observed process outcomes to evaluate the
            regression models.
          </li>
          <li>
            Examined how preprocessing and model choices affected the
            predictions used in process analysis.
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
            The final delivery, signed off on September 14, 2026, contained 6
            pages and 10 legal documents, producing 16 statically exported
            pages. The scope changed through several rounds of client
            feedback.
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
            Delivered two archives, one with the built static site and one
            with the source, plus a step-by-step guide for Cloudflare Workers
            static assets. The client handled final deployment. The earlier
            handover separately listed three pre-launch issues for the client
            to confirm.
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
          As a working student at NMY Mixed Reality Studio, I worked with
          the VR/AR developers and independently built a knowledge-base
          voice-assistant prototype. The retrieval-augmented generation
          pipeline used LangChain and ChromaDB, with a Streamlit interface
          and Bark speech synthesis. I also assessed whether the available
          local hardware could support the intended use.
        </p>

        <h3 className="text-xl font-bold mb-4">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-semibold mb-2 text-[#816334]">
          1. Project Proposal and Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-1 mb-4">
          <li>
            Defined the prototype around questions answered from a fixed
            company knowledge base.
          </li>
          <li>
            Evaluated the language-model and speech components before
            expanding the planned VR/AR integration.
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
            Tested Llama 2 7B and Vicuna 7B with LangChain and ChromaDB for
            retrieval from the knowledge base.
          </li>
          <li>
            Developed and tested on a single NVIDIA RTX 4070 Ti. Model
            inference and Bark text-to-speech had to share the available
            compute.
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
            Assessed the compute required for local language-model inference
            alongside speech synthesis.
          </li>
          <li>
            Reported that the available hardware struggled even with one user
            and could not support the intended concurrent use.
          </li>
          <li>
            Discussed those hardware limits with the studio's VR/AR developers
            as part of the feasibility assessment.
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">Challenges and Insights</h3>
        <p className="mb-4 leading-relaxed">
          The prototype ran, but local inference together with Bark exceeded
          the compute available for the intended service. This made hardware
          feasibility a central outcome of the project.
        </p>
        <p className="mb-4 leading-relaxed">
          The assessment covered the combined workload rather than language-model inference in isolation. Even serving a single user was
          difficult on the available machine.
        </p>
        <p className="mb-4 leading-relaxed">
          I delivered the prototype and reported the constraints to the
          team. The project required more compute than the studio could
          provide, and both sides agreed to end the engagement.
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
      "Led product strategy from company registration to the launch of consumer and business-owner apps on the App Store.",
    highlights: [
      "The team negotiated an angel investment; the funds arrived after I left",
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
          I co-founded BseTech and led the product work in a team spanning
          engineering, design and marketing. From company registration to
          App Store launch, I planned the consumer and business-owner apps,
          defined their information architecture and user flows, built
          prototypes and coordinated delivery across the team.
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
            Planned two connected products: Treat for consumers and Treat for
            Business Owner for merchants, including information architecture,
            user flows and prototypes.
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
            Managed product design and coordinated implementation with the
            engineering and design team.
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
            The team negotiated an angel investment. The funds arrived after I
            had left the company.
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
          Treat and Treat for Business Owner launched on the App Store in
          China in January 2016. The project ended a few months after my
          departure.
        </p>

        <div className="bg-[#fbf3e5]/60 p-5 rounded-lg border-l-4 border-[#C19A49]">
          <h4 className="text-lg font-bold mb-2 text-[#534021]">
            Key Insight & Career Pivot
          </h4>
          <p className="text-sm md:text-base leading-relaxed text-[#333333]">
          After taking the product through launch and the funding stage, I
          wanted to work more directly on the algorithms behind a technology
          product. I left to focus on deep learning and computer vision.
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
          I built and maintain this portfolio independently. It uses
          Next.js, React, TypeScript and Tailwind CSS as a static site on
          Cloudflare Pages. I created the first version in February–March
          2025; in September 2026 I audited the facts, wording and SEO, then
          revised the site in four documented batches.
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
            Used an existing LoRA from Civitai to control the visual style of
            the generated character.
          </li>
          <li>
            Combined the generated character with the site's visual design;
            the image workflow used existing models and adapters.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Frontend Development
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Built with Next.js 14.2.24 and React 18 using the App Router and
            static export. Project content is typed and bundled at build time,
            with no data fetching at runtime.
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
            Used a BentoGrid layout for the About section and reusable cards
            and modal dialogs for project details.
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
            Kept the content in the static export so it could be served
            without an application backend.
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
          The site brings together research, industrial delivery,
          publications and personal projects. I maintain the content
          alongside the frontend; the September 2026 revision added
          Publications and the dedicated RARE26 presentation.
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
          I built two open-source tools after concurrent research sessions
          caused problems with Git writes and local memory. I defined the
          requirements, designed the behavior and reviewed the
          implementations produced with coding agents.
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
            Schedules heavy jobs on a single machine. Jobs wait for a slot and
            available memory, then run with memory limits.
          </li>
          <li>
            The public release is v0.1.1. Later memory-accounting and session-registry extensions belong to my local versions.
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
          Both tools came from specific failures: Git contention and
          accidental staging overlap for wombat-gate, and an out-of-memory
          crash for dingo-pack. Each turns the operational fix into a
          repeatable safeguard.
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
      "Founded and organized the first Chinese-language stand-up comedy club in Germany, leading its establishment and growth through events and community building.",
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
          I founded Germany's first Chinese-language stand-up comedy club
          and ran it with a small group of partners. Between October 2022
          and February 2023, I organized performer workshops, script
          readings, online talks and open mics. I stepped back after
          February 2023; the club continues to operate.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Event Organization</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Organized 8 events spanning performer training, script readings,
            online talks and open mics.
          </li>
          <li>
            Attracted approximately 40-50 participants per event, providing a
            platform for both new and experienced performers.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">2. Community Building</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Reached out to Chinese-language comedy clubs in New York, Paris,
            London, Tokyo and Silicon Valley.
          </li>
          <li>
            Found free venues and equipment so newcomers had a place to
            rehearse and perform.
          </li>
          <li>
            Helped newcomers prepare material and get on stage, with
            opportunities to discuss scripts before performing.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Marketing and Promotion
        </h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Set up the club's social media accounts to announce events and
            reach performers and audiences.
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
            Met people from a Chinese comedy club in Silicon Valley and
            contacted clubs in other cities to learn from their experience.
          </li>
          <li>
            Ran the club with partners while handling event organization, its
            visual identity and audience-feedback process.
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
          The club held 8 events with about 40–50 attendees each during my
          involvement. My work covered organizing the events, designing the
          logo, posters and tickets, and gathering audience feedback for
          performers.
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
          As VÜCD's volunteer Head of Media, I helped plan cultural events,
          sponsorship proposals and publicity in Frankfurt. I also founded
          Infinitas Youth, defined its mission and values, and designed its
          visual identity. I remain listed in the association role, although
          I have been less active over the past one to two years.
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
            Created Infinitas Youth Arena within the youth initiative and
            organized its nonprofit indoor concert series.
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
            Used Stable Diffusion and Figma to create event posters and
            promotional brochures.
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
            Organized 5 nonprofit concerts with 80+ attendees each.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">4. Chinafest 2023</h4>
        <ul className="list-disc pl-5 md:pl-8 space-y-0  mb-4">
          <li>
            Planned the format and theme of Chinafest, optimizing program
            content to enhance participant engagement and experience.
          </li>
          <li>
            Developed the Chinafest 2023 sponsorship plan, including
            exhibition booths and additional sponsorship formats.
          </li>
          <li>
            Used Stable Diffusion generative AI and Figma to create posters and
            promotional brochures.
          </li>
          <li>
            The organizers reported 100,000+ visits over the three days of
            Chinafest 2023 at Roßmarkt, with participation and sponsorship
            from 20+ companies and institutions. These figures describe the
            event as a whole.
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
            My media work included planning and filming the interview series
            alongside the initiative's event publicity.
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
