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
    title: "Visual Object-Centric Learning for Robot Manipulation",
    organization: "École Centrale de Lyon & Intelligent Autonomous Systems Lab",
    timeframe: "October 2024 - Present",
    supervisor: "Alexandre Chapin, Liming Chen, Jan Peters",
    description:
      "Advancing object-centric representation learning for robotic manipulation by integrating Theia, a state-of-the-art visual encoder, with SPOT framework.",
    highlights: [
      "Successfully integrated Theia encoder with SPOT framework, replacing the original DinoV2 backbone",
      "Developed a novel feature translation pipeline utilizing Theia's multi-model distilled knowledge",
      "Implemented adapter layers and projection mechanisms to bridge Theia's 1024D feature space with SPOT's slot representation",
      "Designed modular architecture for utilizing multiple translator heads (DinoV2, CLIP)",
      "Conducted comprehensive experiments on Pascal VOC and COCO datasets",
      "Designed and implemented distributed training framework on SLURM cluster",
    ],
    skills: [
      "PyTorch",
      "Vision Transformers",
      "Self-supervised Learning",
      "Object-centric Learning",
      "SLURM",
      "Docker",
      "Linux",
      "Git",
    ],
    image: "/projects/visual.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          This project aims to advance object-centric representation learning
          for robotic manipulation by integrating Theia, a state-of-the-art
          visual encoder, with SPOT framework. The enhanced architecture
          leverages knowledge distilled from multiple vision foundation models
          while maintaining strong object decomposition capabilities,
          implemented using <span className="font-semibold">PyTorch</span> and
          deployed on <span className="font-semibold">SLURM cluster</span>.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Model Integration</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Successfully integrated Theia encoder with SPOT framework, replacing
            the original DinoV2 backbone
          </li>
          <li>
            Developed a novel feature translation pipeline utilizing Theia's
            multi-model distilled knowledge
          </li>
          <li>
            Implemented adapter layers and projection mechanisms to bridge
            Theia's 1024D feature space with SPOT's slot representation
          </li>
          <li>
            Designed modular architecture for utilizing multiple translator
            heads (DinoV2, CLIP)
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Experimentation & Validation
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Conducted comprehensive experiments on Pascal VOC and COCO datasets
          </li>
          <li>
            Implemented evaluation metrics including mean IOU, ARI scores, and
            object discovery metrics
          </li>
          <li>
            Performed systematic ablation studies to validate architectural
            choices
          </li>
          <li>
            Analyzed feature quality through attention visualization and slot
            assignment analysis
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Technical Infrastructure
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Designed and implemented distributed training framework on SLURM
            cluster
          </li>
          <li>
            Optimized GPU memory usage through gradient checkpointing and
            efficient batch processing
          </li>
          <li>
            Created reproducible training pipelines with Docker containerization
          </li>
          <li>Developed comprehensive logging and visualization tools</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Challenges and Solutions
        </h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Addressed feature dimension mismatch between Theia (1024D) and SPOT
            through careful projection design
          </li>
          <li>
            Overcame training stability issues through gradient clipping and
            learning rate scheduling
          </li>
          <li>
            Resolved memory constraints by implementing efficient batch
            processing and model parallelism
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Currently Working On
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Exploring multi-modal integration with CLIP to leverage both visual
            and textual information
          </li>
          <li>
            Developing 6D pose estimation capabilities by incorporating methods
            like FoundPose and FreeZe
          </li>
          <li>
            Implementing temporal modeling techniques for video sequence
            understanding
          </li>
          <li>
            Experimenting with various object-centric architectures (SAVi++,
            STEVE) for more robust performance
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "repose-image-translation",
    title: "Repose via Image Translation",
    organization: "Graphisch-Interaktive Systeme (GRIS Lab)",
    timeframe: "November 2022 - August 2023",
    supervisor: "Thomas Pöllabauer",
    description:
      "Enhanced style consistency in 6D pose estimation by generating physically-based rendering (PBR) data and modifying image translation models.",
    highlights: [
      "Generated PBR data for BOP YCB objects using BlenderProc, including transformation matrices, depth maps, and masks.",
      "Modified CoCosNet-v2 for image translation, training on generated PBR data and exploring PITI/DragGAN models.",
      "Utilized CosyPose for 6D pose estimation to validate style preservation, addressing geometric consistency challenges.",
      "Overcame technical challenges related to Slurm, Docker, and CUDA for model training and deployment.",
    ],
    skills: [
      "Image Translation",
      "6D Pose Estimation",
      "BlenderProc",
      "PyTorch",
      "OpenCV",
      "Slurm",
      "Docker",
      "Linux",
      "Git",
    ],
    image: "/projects/repose0.webp",
    category: "research",
    content: (
      <div>
        <p className="mb-4">
          This project aims to enhance the style of{" "}
          <span className="font-semibold">6D pose estimation</span> while
          preserving its cues. I achieved this by generating physically-based
          rendering (PBR) data of YCB objects using BlenderProc and modifying
          CoCosNet-v2 for{" "}
          <span className="font-semibold">image translation</span> and CosyPose
          for <span className="font-semibold">pose estimation</span> using{" "}
          <span className="font-semibold">PyTorch</span> and{" "}
          <span className="font-semibold">OpenCV</span>. The project was
          deployed on the <span className="font-semibold">Slurm cluster</span>{" "}
          of Fraunhofer IGD and used{" "}
          <span className="font-semibold">Docker</span> to manage containers.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">1. Data Generation</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Generated PBR data for BOP YCB objects (drill, bowl, and mug) using
            BlenderProc. This included transformation matrices, depth maps, and
            masks from BopToolKit under different rendering textures,
            illumination conditions, angles, and scales.
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

        <h4 className="text-lg font-medium mb-2 mt-4">2. Image Translation</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">3. Pose Estimation</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Challenges and Solutions
        </h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Encountered issues with account access on the Slurm cluster, leading
            to delays and necessitating the use of external ECS servers with
            NVIDIA T4 GPUs.
          </li>
          <li>
            Faced CUDA version conflicts and GUI-related problems, which were
            resolved through extensive troubleshooting and configuration of
            different libraries and environments.
          </li>
          <li>
            Dealt with the inherent complexity of integrating image translation
            and pose estimation models, requiring a deep understanding of both
            domains and significant debugging efforts.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">Future Work</h3>
        <ul className="list-disc pl-5 space-y-2">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2">
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
    title: "TBBPA promotes invasion and migration in liver cancer",
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
            Created custom animated backgrounds (FlickeringGrid,
            BackgroundBeams) for visual interest
          </li>
          <li>
            Implemented scroll-triggered animations and view transitions with
            IntersectionObserver pattern
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. DevOps and Deployment
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2">
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
    id: "merck-pigment-production",
    title: "Pigment Production Optimization",
    organization: "Merck KGaA",
    timeframe: "Ocotober 2023 - November 2024",
    supervisor: "Micheal Schleehahn",
    description:
      "Developed data analysis solutions to optimize production processes for various pigments, achieving significant efficiency improvements and cost reduction.",
    highlights: [
      "Surface Gernsheim Award 2024 - Efficiency Category (Merck) for outstanding contributions to the FRED 2.0 project",
      "Extracted and analyzed large-scale production data from Aspen servers using SQL and Python",
      "Implemented phase detection algorithms and setpoint change analysis to identify optimization opportunities",
      "Collaborated with chemical engineering experts to tailor analyses for each pigment type's unique production process",
      "Provided data-driven insights that contributed to improved production efficiency and cost reduction",
    ],
    skills: [
      "Python",
      "SQL",
      "Data Cleaning",
      "Time Series Analysis",
      "Process Optimization",
      "Collaborative Data Science",
    ],
    image: "/projects/fred.webp",
    category: "corporate",
    content: (
      <div>
        <p className="mb-4">
          At Merck KGaA, I developed data analysis solutions to optimize
          production processes for various pigments, including Iriodin and
          Iriotec series. I extracted and analyzed large-scale production data
          from Aspen servers using <span className="font-semibold">SQL</span>{" "}
          and <span className="font-semibold">Python</span>. I implemented phase
          detection algorithms and setpoint change analysis to identify
          optimization opportunities. I collaborated with chemical engineering
          experts to tailor analyses for each pigment type's unique production
          process. I provided data-driven insights that contributed to improved
          production efficiency and cost reduction across multiple product
          lines.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">Recognition</h3>
        <p className="mb-4">
          <span className="font-semibold">
            Surface Gernsheim Award 2024 - Efficiency Category (Merck)
          </span>{" "}
          - Recognized for outstanding contributions to the FRED 2.0 project,
          achieving significant efficiency improvements and cost reduction in
          pigment production processes at Merck, Gernsheim, Germany.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Data Extraction and Cleaning
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Used SQL to extract raw production data from Aspen servers for
            multiple pigment types.
          </li>
          <li>
            Developed and implemented data cleaning scripts using Python,
            handling large datasets efficiently.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Phase Identification and Analysis
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Collaborated with chemical engineering experts to establish criteria
            for identifying different production phases for each pigment type.
          </li>
          <li>
            Implemented phase detection algorithm that identify the phases we
            aim to optimize in the pigment production process.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Setpoint Change Analysis
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Analyzed manual setpoint changes, including frequency and magnitude
            of changes for each pigment type.
          </li>
          <li>
            Identified meaningful manual interventions and those that could be
            avoided to optimize the production process.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          4. Process Optimization and Cost Reduction
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Based on the analysis of each product, provided tailored insights to
            optimize production processes.
          </li>
          <li>
            Contributed to significant cost reductions in pigment production
            through data-driven recommendations across multiple product lines.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-photoresist",
    title: "Photoresist Production Optimization",
    organization: "Merck KGaA",
    timeframe: "May 2024 - Present",
    supervisor: "Micheal Schleehahn",
    description:
      "Developed a data-driven solution to optimize photoresist process in semiconductor production, improving production efficiency and product quality.",
    highlights: [
      "Presented at Merck Data Science Garage (January 2025) to global data science team",
      "Developed data pipeline integrating multiple sources including Excel and PDF files",
      "Designed and implemented extensive model search pipeline testing over 5000 combinations",
      "Created user-friendly Streamlit web application with multilingual support",
      "Achieved First Time Right (FTR) rate between 83% and 95% in testing",
    ],
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Machine Learning",
      "Feature Engineering",
      "Data Visualization",
      "Streamlit",
    ],
    image: "/projects/photoresist.webp",
    category: "corporate",
    content: (
      <div>
        <p className="mb-4">
          Developed a comprehensive data-driven solution to optimize the
          photoresist process in semiconductor production at Merck KGaA. This
          project utilized advanced data analysis, machine learning techniques,
          and web application development to enhance production efficiency and
          product quality.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">Recognition</h3>
        <p className="mb-4">
          <span className="font-semibold">
            Presented at Merck Data Science Garage (January 2025)
          </span>{" "}
          to global data science team. This presentation showcased the project's
          methodology, results, and future potential to Merck's global data
          science community.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Key Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Data Integration and Preprocessing
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Developed a robust data pipeline to integrate multiple data sources,
            including Excel files for L- and M-semi Batch No., Raw Material Lot
            No., and Raw Material Quality Values, as well as PDF files
            containing Raw Material Amounts.
          </li>
          <li>
            Implemented sophisticated data cleaning and anomaly detection
            techniques to ensure data integrity.
          </li>
          <li>
            Conducted thorough exploratory data analysis, including PCA, to
            understand data complexity and inform feature engineering
            strategies.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Advanced Machine Learning Model Development
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Designed and implemented an{" "}
            <span className="font-semibold">
              extensive and automated model search pipeline, rigorously testing
              over 5000 different combinations
            </span>{" "}
            of preprocessing steps and models to identify the optimal
            configuration.
          </li>
          <li>
            Tested 704 initial combinations and expanded to{" "}
            <span className="font-semibold">over 5000 combinations</span>{" "}
            through automated hyperparameter tuning and model variations.
          </li>
          <li>
            Developed a custom scoring system balancing MSE and R² scores for
            project-specific requirements.
          </li>
          <li>
            Implemented and compared various regression models, including Linear
            Regression, Ridge, Lasso, Random Forest, Gradient Boosting, SVR,
            KNN, XGBoost, LightGBM, Bayesian Ridge, and Gaussian Process
            Regression.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Web Application Development and Deployment
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Developed a user-friendly Streamlit web application for easy result
            interpretation and model deployment.
          </li>
          <li>
            Implemented features for data upload (Excel and PDF), automated data
            processing, and model prediction.
          </li>
          <li>
            Deployed the application on Uptimize App Service, ensuring
            accessibility and scalability.
          </li>
          <li>
            Developed a bilingual interface (English and Chinese) to cater to
            diverse user groups within the organization.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Outcomes and Key Learnings
        </h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <span className="font-semibold">
              Significantly Improved Prediction Accuracy:
            </span>{" "}
            Top models achieved a First Time Right (FTR) rate between 83% and
            95% in testing, improving prediction accuracy for photoresist
            production processes.
          </li>
          <li>
            <span className="font-semibold">
              Key Process Parameter Identification:
            </span>{" "}
            Identified critical process parameters influencing product quality,
            providing valuable insights for optimization.
          </li>
          <li>
            <span className="font-semibold">
              Feature Engineering Importance:
            </span>{" "}
            Confirmed the crucial role of feature engineering for accurate
            process representation in datasets.
          </li>
          <li>
            <span className="font-semibold">
              Tools for Process Optimization:
            </span>{" "}
            Developed tools for ongoing process optimization and decision
            support.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "merck-lab-reservation",
    title: "Laboratory Equipment Reservation System",
    organization: "Merck KGaA",
    timeframe: "April 2024 - Jan 2025",
    supervisor: "Hans-Martin Körber",
    description:
      "Developed a comprehensive full-stack web application for laboratory equipment reservation, optimizing resource management and improving utilization.",
    highlights: [
      "Developed responsive frontend using Vue.js 3 and Vuetify with custom theming and localization",
      "Built high-performance backend API using FastAPI and Tortoise ORM",
      "Implemented database replication to AWS S3 using Litestream for data durability",
      "Integrated SSO authentication using Foundry Dev Tools and created secure token-based authentication flow",
      "Deployed application on AWS EC2 using Docker containers with Azure DevOps CI/CD pipelines",
    ],
    skills: [
      "Python",
      "FastAPI",
      "Vue.js",
      "Vuetify",
      "SQLite",
      "Tortoise ORM",
      "AWS ECR",
      "S3",
      "Docker",
      "CI/CD",
      "Azure DevOps",
    ],
    image: "/projects/booking.webp",
    category: "corporate",
    content: (
      <div>
        <p className="mb-4">
          Developed a comprehensive full-stack web application for laboratory
          equipment reservation, optimizing laboratory resource management and
          improving equipment utilization at Merck KGaA.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">Tech Stack</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <span className="font-semibold">Backend:</span> Python 3.12,
            FastAPI, Tortoise ORM, Aerich
          </li>
          <li>
            <span className="font-semibold">Frontend:</span> Vue.js 3, Vite,
            Vuetify, Pinia, Vue Router
          </li>
          <li>
            <span className="font-semibold">Database:</span> SQLite with
            Litestream for replication to AWS S3 via Foundry
          </li>
          <li>
            <span className="font-semibold">Authentication:</span> SSO
            integration with Foundry
          </li>
          <li>
            <span className="font-semibold">Deployment:</span> Docker, AWS EC2,
            Azure DevOps, Uptimize App Service
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Full-Stack Development
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Advanced UI/UX Design
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Created an interactive calendar view for reservation scheduling.
          </li>
          <li>
            Developed custom components for device browsing, search, and
            reservation management.
          </li>
          <li>Implemented light and dark themes and multi-language support.</li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Database and Data Management
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Utilized SQLite for local data storage with Tortoise ORM for
            database operations.
          </li>
          <li>
            Implemented Litestream for database replication to AWS S3 bucket on
            Foundry, ensuring data durability in a containerized environment.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          4. Authentication and Security
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Integrated SSO authentication using Foundry Dev Tools.</li>
          <li>
            Implemented secure token-based authentication flow and user
            management system.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          5. DevOps and Deployment
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
    id: "merck-parteck-optimization",
    title: "Parteck® Production Optimization",
    organization: "Merck KGaA",
    timeframe: "December 2023 - April 2024",
    supervisor: "Micheal Schleehahn",
    description:
      "Utilized ML techniques to optimize pharmaceutical production parameters for Parteck® products, enhancing product quality and manufacturing efficiency.",
    highlights: [
      "Analyzed key pharmaceutical production parameters in fluid bed processing including spray conditions, air flow, temperatures, and equipment settings",
      "Implemented preprocessing techniques including various scaling methods and Box-Cox transformation for skewed data",
      "Developed and compared multiple regression models to predict and optimize process outcomes",
      "Created interactive visualizations and dashboards using Plotly and Matplotlib for monitoring parameters",
    ],
    skills: [
      "Python",
      "Machine Learning",
      "Statistical Analysis",
      "Data Visualization",
      "Process Optimization",
      "Time Series Analysis",
      "Pharmaceutical Manufacturing",
    ],
    image: "/projects/parteck.webp",
    category: "corporate",
    content: (
      <div>
        <p className="mb-4">
          As part of the Data Sciences team at Merck KGaA, I worked on
          optimizing the Parteck® production process, applying{" "}
          <span className="font-semibold">machine learning</span> and{" "}
          <span className="font-semibold">data analysis</span> techniques to
          enhance pharmaceutical manufacturing efficiency and product quality.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Comprehensive Process Parameter Analysis
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Analyzed key pharmaceutical production parameters including spray
            conditions, air flow, temperatures, bed heights, and
            equipment-specific settings in fluid bed processing.
          </li>
          <li>
            Developed understanding of parameter interactions and their
            influence on product quality.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Advanced Data Analysis and Preprocessing
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Utilized Python (Pandas, NumPy) for data manipulation and analysis
            of complex manufacturing data.
          </li>
          <li>
            Implemented preprocessing techniques including various scaling
            methods and Box-Cox transformation for skewed data.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Machine Learning Model Development
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Developed and compared multiple regression models (Linear
            Regression, Random Forest, Gradient Boosting, SVR, Neural Networks,
            PLS Regression) to predict and optimize process outcomes.
          </li>
          <li>
            Implemented ensemble methods and NGBoost for improved accuracy and
            uncertainty quantification.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          4. Model Evaluation and Process Optimization
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Evaluated models using various metrics to ensure accurate prediction
            of critical quality attributes.
          </li>
          <li>
            Optimized model hyperparameters and provided data-driven insights
            for process improvements.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          5. Data Visualization and Reporting
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Created interactive visualizations and dashboards using Plotly and
            Matplotlib for monitoring key process parameters and model
            predictions.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          6. Cross-Product Analysis
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Conducted comparative analysis between different Parteck products to
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
      "Collaborated with VR/AR developers to build a voice-interactive assistant using large language models for enterprise users in virtual reality environments.",
    highlights: [
      "Proposed virtual scene for conversational information acquisition with an assistant",
      "Utilized Llama2, LangChain, and Streamlit to create a chatbot with knowledge base embedding",
      "Experimented with Vicuna 7b and Llama 2 7b models integrated with LangChain",
      "Implemented text-to-speech functionality using Bark for voice interaction",
      "Provided strategic suggestions for project architecture and AI component integration",
    ],
    skills: [
      "Open LLMs",
      "Llama2",
      "LangChain",
      "Knowledge Base Embedding",
      "Chroma",
      "Streamlit",
      "Bark",
      "Project Architecture",
      "Strategic Planning",
    ],
    image: "/projects/llm.webp",
    category: "corporate",
    content: (
      <div>
        <p className="mb-4">
          During my time at NMY Mixed Reality Studio, I collaborated with VR/AR
          developers to build a voice-interactive assistant using large language
          models (LLMs) for enterprise users. The assistant was designed to
          answer questions based on a vector knowledge base specific to the
          company's business knowledge using Chroma.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Responsibilities and Achievements
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Project Proposal and Development
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Technical Implementation
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Utilized Llama2, LangChain, and Streamlit to create a chatbot with a
            fixed knowledge base.
          </li>
          <li>
            Experimented with Vicuna 7b and Llama 2 7b models, integrating them
            with LangChain to achieve Knowledge Base Embedding.
          </li>
          <li>
            Developed and tested the chatbot on a system with an NVIDIA 4070ti
            GPU, which limited us to running 7b models.
          </li>
          <li>
            Implemented text-to-speech functionality using Bark to enable voice
            interaction.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Project Architecture and Strategy
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Challenges and Insights
        </h3>
        <p className="mb-4">
          I recognized that providing a local LLM-based assistant for enterprise
          users required more computational resources than we had available. An
          NVIDIA 4070ti and 7b models were insufficient, especially when
          combined with the additional load of text-to-speech conversion using
          Bark. The VR/AR devices' computational limitations further compounded
          the issue.
        </p>
        <p className="mb-4">
          Given the current computational constraints, it was challenging to
          serve even a single user effectively, let alone multiple users
          simultaneously, which is essential for a viable enterprise solution.
          This situation raised concerns about the scalability and profitability
          of the solution.
        </p>
      </div>
    ),
  },
  {
    id: "startup-bsetech",
    title: "Wellness Industry Mobile Apps",
    organization: "Hangzhou BseTech Co.,Ltd.",
    timeframe: "October 2015 - January 2016",
    supervisor: "Bancheng Zhou",
    description:
      "As co-founder and product manager, oversaw every step from company registration to launching initial apps for the wellness industry.",
    highlights: [
      "Conducted market research and led commercial visits with industry managers to gain insights into the wellness industry",
      "Designed mobile apps and managed development process, creating detailed prototypes and wireframes",
      "Assisted technical supervisor in developing LBS location service plan and investigated third-party platforms",
      "Tested prototypes by visiting stores before launch to gather feedback and make adjustments",
      "Launched Treat app and Treat for Business Owner app on the App Store China in January 2016",
    ],
    skills: [
      "Mobile App",
      "LBS",
      "SDK Integration",
      "Prototype",
      "Interaction Design",
      "UE Design",
      "Market Research",
      "Business Planning",
      "Investor Outreach",
    ],
    image: "/projects/treat.webp",
    category: "corporate",
    content: (
      <div>
        <p className="mb-4">
          As the co-founder and product manager of a wellness industry startup,
          I oversaw every step of the process from company registration to
          launching the initial apps. My responsibilities included market
          research, mobile app design, development, testing, and investor
          outreach.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-6">
          Detailed Implementation
        </h3>

        <h4 className="text-lg font-medium mb-2 mt-4">
          1. Market Research and Planning
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h4 className="text-lg font-medium mb-2 mt-4">
          2. Product Design and Prototyping
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h4 className="text-lg font-medium mb-2 mt-4">
          3. Technical Development
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h4 className="text-lg font-medium mb-2 mt-4">
          4. Product Testing and Feedback
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Worked closely with customers, business owners, and technicians to
            refine app features and functionalities.
          </li>
          <li>
            Tested the prototypes by visiting stores before launch to gather
            feedback and make necessary adjustments.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-2 mt-4">
          5. Promotion and Launch
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
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

        <h4 className="text-lg font-medium mb-2 mt-4">
          6. Investor Outreach and Business Development
        </h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Met with investors and pitched the business plan, securing initial
            funding for the project.
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

        <h3 className="text-xl font-semibold mb-2 mt-6">Project Outcome</h3>
        <p className="mb-4">
          The Treat app and Treat for Business Owner app were launched on the
          App Store China in January 2016. Despite initial success, the project
          was terminated later that year due to market challenges and strategic
          pivots.
        </p>
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
        <ul className="list-disc pl-5 space-y-2 mb-4">
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
    title: "Corporate Projects",
    value: "corporate",
    content: (
      <div className="w-full bg-[#A67C3D]/90 backdrop-blur-sm p-8 rounded-xl">
        <ProjectGrid
          projects={projectsData.filter(
            (project) => project.category === "corporate"
          )}
        />
      </div>
    ),
  },
  {
    title: "Research Projects",
    value: "research",
    content: (
      <div className="w-full bg-[#A67C3D]/80 backdrop-blur-sm p-8 rounded-xl">
        <ProjectGrid
          projects={projectsData.filter(
            (project) => project.category === "research"
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
            (project) => project.category === "social"
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
