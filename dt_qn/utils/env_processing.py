import numpy as np
from typing import Union
import os
from torchrl.data import BoundedTensorSpec, CompositeSpec, UnboundedContinuousTensorSpec
from torchrl.envs import EnvBase
import torch
from tensordict import TensorDict


class TestEnvironment(EnvBase):
    def __init__(self, A, B, C, D, dt, ref=1, device="cpu"):
        super(TestEnvironment, self).__init__() # call the constructor of the base class
        
        # custom property intialization - unique to this environment
        self.dtype = np.float32

        self.A, self.B, self.C, self.D, self.dt, self.ref = A, B, C, D, dt, ref
        self.device = device # where does the outgoing data go?

        self.state_size = self.A.shape[0] # how many in the first dimension
        self.action_size = self.B.shape[1] # how many in the second dimension

        self.state = np.zeros((self.state_size, 1), dtype=self.dtype)
        
        # specs - needs to be initialized
        self.action_spec = BoundedTensorSpec(minimum=-1, maximum=1, shape=torch.Size([self.action_size])) # limit the action values

        #this is the requirement of the abstract class but state = observation so it is never        
        observation_spec = UnboundedContinuousTensorSpec(shape=torch.Size([self.state_size])) # unlimited observation space
        self.observation_spec = CompositeSpec(observation=observation_spec) # has to be CompositeSpec(not sure why)

        self.reward_spec = UnboundedContinuousTensorSpec(shape=torch.Size([1])) # unlimited reward space(even though we could limit it to (-inf, 0] in this particular example)

    def _reset(self, tensordict, **kwargs):
        
        # init new state and pack it up in a tensordict
        
        out_tensordict = TensorDict({}, batch_size=torch.Size())

        self.state = np.zeros((self.state_size, 1), dtype=self.dtype)
        out_tensordict.set("observation", torch.tensor(self.state.flatten(), device=self.device))

        return out_tensordict

    def _step(self, tensordict):
        #needs to be changed
        action = tensordict["action"]
        action = action.cpu().numpy().reshape((self.action_size, 1))

        self.state += self.dt * (self.A @ self.state + self.B @ action)

        y = self.C @ self.state + self.D @ action

        error = (self.ref - y) ** 2

        reward = -error

        out_tensordict = TensorDict({"observation": torch.tensor(self.state.astype(self.dtype).flatten(), device=self.device),
                                     "reward": torch.tensor(reward.astype(np.float32), device=self.device),
                                     "done": False}, batch_size=torch.Size())

        return out_tensordict

    def _set_seed(self, seed):
        pass


def get_env_obs_length(env: TestEnvironment) -> int:
    """Gets the length of the observations in an environment"""
    if isinstance(env.state_spec): 
        return env.state_size
    else:
        raise NotImplementedError(f"We do not yet support {env.observation_space}") #if nothing


def get_env_obs_mask(env: TestEnvironment) -> Union[int, np.ndarray]:
    """Gets the number of observations possible (for discrete case).
    For continuous case, please edit the -5 to something lower than
    lowest possible observation (while still being finite) so the
    network knows it is padding.
    """
    # changed to a variable (in agent utils) when creating the agent, passed in as a obs_vocab_size
    if isinstance(env.observation_space): # find the lowest possible indice that is realistic
        # If you would like to use DTQN with a continuous action space, make sure this value is
        #       below the minimum possible observation. Otherwise it will appear as a real observation
        #       to the network which may cause issues. In our case, Car Flag has min of -1 so this is
        #       fine.
        # find the lowest indice
        return -5
    else:
        raise NotImplementedError(f"We do not yet support {env.observation_space}")


def get_env_max_steps(env: TestEnvironment) -> Union[int, None]:
    """Gets the maximum steps allowed in an episode before auto-terminating"""
    try:
        return env._max_episode_steps
    except AttributeError:
        try:
            return env.max_episode_steps
        except AttributeError:
            return None
