# Predicting-Commodity-Food-Pricing
MAIC Research Group 1 (2023-2024 cohort) of 8 students from Milwaukee School of Engineering (MSOE) working together with two professors to develop an AI algorithm to predict commodity food pricing.

<img src="https://github.com/Benja-Pauls/Predicting-Commodity-Food-Pricing/assets/73416124/1f89a5f8-9686-4f61-8402-a44769cd0ed8" alt="MicrosoftTeams-image (1)" width="200"/>


## Cloning Repo On Rosie
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
* **Getting Started with ML/DL**
    * a
    * b
* **Reinforcement Learning**
    * [Pong to Pixels: Intro to Deep RL](http://karpathy.github.io/2016/05/31/rl/)
    * **Deep Q-Learning:**
        * https://www.youtube.com/watch?v=rFwQDDbYTm4
        * https://www.tensorflow.org/agents/tutorials/0_intro_rl
        * https://towardsdatascience.com/value-based-methods-in-deep-reinforcement-learning-d40ca1086e1
        * https://www.baeldung.com/cs/q-learning-vs-deep-q-learning-vs-deep-q-network
