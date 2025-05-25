export const conversationContent = {
  steps: {
    selfAwareness: {
      title: '自我觉察',
      prompts: {
        initial: '请问你现在的感受是什么？可以描述一下你的情绪吗？'
      }
    },
    clearGoals: {
      title: '明确目标',
      prompts: {
        initial: '让我们一起来明确这次对话的目标。首先，你真正想要的是什么？',
        followUps: {
          desire: [
            '然后呢？能说得更具体一些吗？',
            '这个想法背后，你真正渴望的是什么？',
            '如果实现了这个愿望，对你来说意味着什么？',
            '你觉得这个愿望对对方来说可能意味着什么？'
          ],
          goal: [
            '好的，让我们继续。你希望通过这次对话达成什么具体目标？',
            '这个目标对你来说为什么重要？',
            '你觉得这个目标对你们的关系会有什么影响？',
            '这个目标对对方来说可能意味着什么？'
          ],
          expectation: [
            '那么，你希望对方在对话后有什么感受和行动？',
            '这些期望背后，你真正希望对方理解的是什么？',
            '你觉得这些期望对你们的关系会有什么影响？',
            '让我们思考一下，这些目标对你们双方有什么共同的好处？'
          ],
          summary: '你觉得还有什么需要补充或调整的吗？'
        }
      }
    },
    safetyAtmosphere: {
      title: '安全氛围',
      prompts: {
        initial: '你觉得现在的沟通氛围安全吗？如果不安全，可以怎么恢复？'
      }
    },
    respect: {
      title: '保持尊重',
      prompts: {
        initial: '在沟通过程中，你会如何保持对彼此的尊重？请分享你的想法。'
      }
    },
    fiveStepMethod: {
      title: '五步沟通法',
      prompts: {
        initial: '请尝试用STATE五步法沟通：分享事实、表达感受、询问对方想法、试探表达、鼓励测试。'
      }
    },
    conflictHandling: {
      title: '冲突处理',
      prompts: {
        initial: '如果对方拒绝沟通、情绪失控或陷入僵局，你会怎么做？'
      }
    }
  }
}; 