# Predicting-Commodity-Food-Pricing
MAIC Research Group 1 (2023-2024 cohort) of 8 students from Milwaukee School of Engineering (MSOE) working together with two professors to develop an AI algorithm to predict commodity food pricing.

<img src="https://github.com/Benja-Pauls/Predicting-Commodity-Food-Pricing/assets/73416124/1f89a5f8-9686-4f61-8402-a44769cd0ed8" alt="MicrosoftTeams-image (1)" width="200"/>

## Getting Started With Repository
For understanding our current solution's methods, please see the Jupyter Notebooks `data_analysis.ipynb` and `model_experiments.ipynb`. These Jupyter Notebooks outline the data processing from raw data sources (such as the FAO data portal, Yahoo Finance, and other sources), and how our current model interprets the cleaned data and outputs predictions for future commodity price fluctuations respectively. Beyond this, each sub-directory should include a README outlining the purpose and approach of each.

## Abstract
The exchange of food commodities occurs along intricate global supply chains, consistently consumers to the effects of global price fluctuations. Real-time access to pricing information concerning these commodities enhances market transparency, empowering both producers and consumers to make informed decisions. Significant fluctuations in food prices serve as signals for concerning conditions in current food commodity markets, requiring attention from both parties; these price increases can indicate less favorable market conditions, such as global conflict or famine. Sharp price increases in food commodity markets can affect the proportion of household incomes allocated to food expenditures, disproportionately impacting the well-being of consumers. This is particularly apparent in countries where the average consumer spends a substantial part of their income on food, resulting in food insecurity. Previous solutions -- such as the global warning system provided by the United Nations (UN) Food and Agriculture Organization (FAO) -- involve advanced statistical systems responsible for proactively forecasting food commodity prices as predictors for global warning systems. These systems leverage indicators of food security to generate precise forecasts well in advance, thereby facilitating community-level preparedness for impending food crises. Our method for improving upon this prior work hinges on strong price security indicators in conjunction with state-of-the-art deep learning (DL) techniques to uncover intricate relationships. Data sources such as real commodity price history, food security indices, market futures, and sentiment from global announcements provide crucial indicators for early predictions. DL offers a method for capturing complex relationships between data sources, supported by rigorous data preprocessing and feature engineering to capture the multifaceted influences on food prices. By employing advanced time-series prediction techniques for food commodity price trends, and a reinforcement learning (RL) framework specialized in severity state forecasting validated on real data from diverse markets, we extend prior efforts to support global communities in enhancing proactive food security measures. The scope of our model extends beyond the limitations of existing systems by aiming to provide a comprehensive solution applicable across multiple commodities. By adopting this holistic approach to price dynamics, our model addresses the complexity of global commodity markets, recognizing the interconnectedness of international influences on price. The construction of this predictive pipeline is aimed at seamless integration with established anomaly-warning frameworks, thereby augmenting their ability to preemptively address price volatility for global communities. 

## Cloning Repo On ROSIE (MSOE's On-Site SuperComputer)
For more information about ROSIE, please see [this article](https://www.msoe.edu/about-msoe/news/details/meet-rosie/) from MSOE.

You can also clone this repo locally, but it will be beneficial to have this repo on Rosie to utilize the computational power.
1. Navigate to the [Rosie Dashboard](https://dh-ood.hpc.msoe.edu/pun/sys/dashboard/)
2. Navigate to "Clusters" and then ">_Rosie Shell Access"
3. Navigate to your desired folder to clone the repo into
4. Clone repo via ssh `git clone git@github.com:Benja-Pauls/Predicting-Commodity-Food-Pricing.git` or https `git clone https://github.com/Benja-Pauls/Predicting-Commodity-Food-Pricing.git`

## Git commands
If your repo is on Rosie, you will need to go to `>_Rosie Shell Access` and navigate to your repo's location. From there, you will run git commands in the terminal.<br>If your repo is on a pc somewhere, use git bash or Github Desktop.<br><br>
To update your local repo:
1. `git fetch`
2. `git pull`<br><br>

To commit your local changes
1. `git status` to view your changes in your local repo
2. `git add .` or `git add -A` to add all local changes or `git add <file_location>` to add a single file. You can then use `git status` again to make sure your have added the right files
3. `git commit -m "<your_commit_message"` Example messages: "Add run.py to make running the project easier", "Fix bug in the LLM api", "Remove unnecessary code from code.py"<br><br>

To push your changes to the remote repository (you first need to commit your local changes, see above)
1. `git fetch`
2. `git pull`
3. Handle any merge conflicts if there are any. This can get messy if it happens. DO NOT be afraid to ask for help. Remember, if you mess up your local repo, you can always reset to your most recent commit using `git reset --hard`. 
4. `git push`
       

## Data Folder Setup
1. Create a directory within the project called `data`. This repo is setup to ignore a `data` folder when tracking changes.<br>
2. Download data into the `data` folder from one of the following options<br>
    1. Download dataset from kaggle for early experimenting: [Global Food Prices](https://www.kaggle.com/datasets/jboysen/global-food-prices)

    2. Download the data we hopefully have access to from the Food and Agriculture Organization of the United Nations (FAO)
  
## Research Resources
* **History of Stock Analysis Using AI:** [Literature Review](https://www.sciencedirect.com/science/article/pii/S0957417422001452)
* **History of RL & Their Applications:** [Diffusion Models For Time Series Applications: A Survey](https://arxiv.org/pdf/2305.00624.pdf) & [Beyond Deep Reinforcement Learning: A Tutorial on Generative Diffusion Models in Network Optimization](https://arxiv.org/pdf/2308.05384.pdf)
* **Rainbow RL:** [Rainbow: Combining Improvements in Deep Reinforcement Learning](https://arxiv.org/pdf/1710.02298.pdf)
* **DQL For Financial Analysis:** [Robust Forex Trading with Dep Q Network (DQN)](https://core.ac.uk/download/pdf/233618241.pdf)
* **Getting Good RL Results With Sparse Data:** [A Deep Reinforcement Learning Approach for Early Classification of Time Series](https://ieeexplore.ieee.org/abstract/document/8553544)
* **Unsupervised Reward Learning:** [Autonomous anomaly detection on traffic flow time series with reinforcement learning](https://www.sciencedirect.com/science/article/pii/S0968090X23000785)
* **Text Prompting for RL Response (2009):** [Reinforcement Learnign for Mapping Instructions to Actions](http://people.csail.mit.edu/branavan/papers/acl2009.pdf)
    * **Possibly Newer Paper:** [Mapping Instructions and Visual Observations to Actions with RL](https://ar5iv.labs.arxiv.org/html/1704.08795) & [Associated Paper](https://arxiv.org/pdf/1704.08795.pdf)
* **RNNs for Stock Trendlines:** [Deep Reinforcement Learning for Time Series: Playing Idealized Trading Games](https://arxiv.org/ftp/arxiv/papers/1803/1803.03916.pdf) with [Associated GitHub Repo](https://github.com/golsun/deep-RL-trading)
* **Sentiment Analysis of USDA Announcements:** [Market Uncertainty and Sentiment Around USDA Announcements](https://deliverypdf.ssrn.com/delivery.php?ID=152013104065026067086094070025031102101074051042007060126090024090122107127007073073055020029097121126020120094007105127010080059016075034036069004022096023116075014087047066072125025004077007070086065121027107121127127126070104086077106111085104125&EXT=pdf&INDEX=TRUE)
* **Stocks-to-use Ratio:** [Stocks-to-use ratios and prices as indicators of vulnerability to spikes in global cereal markets](https://are.berkeley.edu/~bwright/Wright/Publications_files/Stocks%20to%20use.pdf)
* **HUGE LIST OF RL RESOURCES:** [GitHub Repo](https://github.com/zhjohnchan/awesome-reinforcement-learning-in-nlp)
* **LIST OF ANOMALY DETECTION RESOURCES:** [GitHub Repo](https://github.com/yzhao062/anomaly-detection-resources)

## Learning Resources
* **Meeting Slideshows**
    * [Meeting 1 (Intro to Project)](https://msoe365-my.sharepoint.com/:p:/g/personal/paulsonb_msoe_edu/EW4vvBaQ-2lEiQ8JT0SyGrABPAw2XX_gmUFVMPbnu3rgEQ?e=FbcXzu)
    * [Meeting 2 (Intro to ML & RL)](https://msoe365-my.sharepoint.com/:p:/g/personal/paulsonb_msoe_edu/EXE4yy6XJd1JmCw8Vkv7kT0BPDHKvm31xhIi8ceT6H_oYA?e=WVBrDF)
    * [Meeting 3 (Structure & Ideas)](https://msoe365-my.sharepoint.com/:p:/g/personal/paulsonb_msoe_edu/EYL6I-JCwN9Bm4NDayM0d7wB4gMfGOAuflNXutgejpXfGA?e=AVRxD9)
    * [Meeting 4 (Where's the Data?)](https://msoe365-my.sharepoint.com/:p:/g/personal/paulsonb_msoe_edu/EdzO6Qa7HPFHkRuGlNOmBi0BlgbYY8L9ZpDlSUrCOfBXFA?e=jPgi4G)
    * Meeting 5 (HacksGiving Hackathon) -- no slides
    * [Meeting 6 (Moving Forward with Transformers)](https://msoe365-my.sharepoint.com/:p:/g/personal/paulsonb_msoe_edu/Ec1y0nHl5AVOit_HUJYllfcBIOBYmoYCjHs1TxCmIyRMUg?e=Mo2cvL)
* **Getting Started with ML/DL**
    * **Animated Slides About Basics of ML:** https://msoe365-my.sharepoint.com/:p:/g/personal/paulsonb_msoe_edu/EXE4yy6XJd1JmCw8Vkv7kT0BPDHKvm31xhIi8ceT6H_oYA?e=WVBrDF
    * **3Blue1Brown Video Series:** https://www.youtube.com/watch?v=aircAruvnKk&t=1s
    * **Intro to Tensorflow (Getting Started with AI):** https://www.tensorflow.org/learn
    * **Intro to PyTorch (Advanced AI Building):** https://pytorch.org/tutorials/beginner/basics/intro.html
* **Reinforcement Learning**
    * [Pong to Pixels: Intro to Deep RL](http://karpathy.github.io/2016/05/31/rl/)
    * **Deep Q-Learning:**
        * https://www.youtube.com/watch?v=rFwQDDbYTm4
        * https://www.tensorflow.org/agents/tutorials/0_intro_rl
        * https://towardsdatascience.com/value-based-methods-in-deep-reinforcement-learning-d40ca1086e1
        * https://www.baeldung.com/cs/q-learning-vs-deep-q-learning-vs-deep-q-network
    * **Online Resources:** [Mini Course in Dynamic Structural Econometrics, UAB, September 12-16, 2022](https://nam11.safelinks.protection.outlook.com/?url=https%3A%2F%2Fgithub.com%2Fbschjerning%2Fdp_uab&data=05%7C02%7Cpaulsonb%40msoe.edu%7C41454f138348425a3e3908dbfb26c330%7C4046ceacfdd346c9ac80b7c4a49bab70%7C0%7C0%7C638379916269630594%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=DMs8pfnfgW%2B4TT7B%2Bx2TlbV%2B96glzTVu%2B%2BXwEtAM180%3D&reserved=0)
