/**
 * Dynamic 3D Story Engine for Infinity World
 * Supports Animals, Family Members, and Shapes in branching story adventures.
 */

export class StoryEngine {
  constructor() {
    this.currentStory = null;
    this.currentNodeId = 'start';
    this.storyHistory = [];
    this.savedStories = this.loadSavedStories();
  }

  loadSavedStories() {
    try {
      const data = localStorage.getItem('infinity_3d_world_stories');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveStoryToLibrary(storyData) {
    this.savedStories.push({
      id: 'story3d_' + Date.now(),
      title: storyData.title,
      date: new Date().toLocaleDateString(),
      heroName: storyData.hero.name,
      category: storyData.hero.category,
      realm: storyData.realm,
      ending: storyData.ending
    });
    try {
      localStorage.setItem('infinity_3d_world_stories', JSON.stringify(this.savedStories));
    } catch (e) {}
  }

  generateStoryTree(config) {
    const heroName = config.hero.name || 'Pip';
    const heroType = (config.hero.type || 'puppy').toUpperCase();
    const companionName = config.companion.name || 'Buddy';
    const realm = config.realm || 'forest';

    const realmNames = {
      forest: 'The 3D Neon Shape & Animal Forest 🌲',
      galaxy: 'The 3D Rainbow Candy Galaxy 🌌',
      castle: 'The 3D Floating Geometry Castle 🏰',
      cloud: 'The 3D Cloud Kingdom ☁️'
    };

    const realmName = realmNames[realm] || 'The 3D Magical Realm';
    const storyTitle = `${heroName} the ${heroType}'s Quest for 3D Infinity!`;

    const tree = {
      title: storyTitle,
      hero: config.hero,
      companion: config.companion,
      realm: realm,
      nodes: {
        'start': {
          id: 'start',
          speaker: companionName,
          text: `Hi ${heroName}! Welcome to ${realmName}! All the 3D animals, family members, and shape friends are gathering to find the Secret of Infinity! Where should we run first?`,
          realm: realm,
          choices: [
            {
              text: 'Run down the 3D Crystal Path 💎',
              desc: 'Run with your 3D legs along the sparkling crystal trail.',
              nextNodeId: 'node_crystal'
            },
            {
              text: 'Fly up to the 3D Sky Castle 🏰',
              desc: 'Flap wings or leap high into the 3D clouds.',
              nextNodeId: 'node_sky'
            }
          ]
        },
        'node_crystal': {
          id: 'node_crystal',
          speaker: heroName,
          text: `We found a glowing 3D shape door locked with ancient symbols! We need to solve the 3D shape matcher!`,
          realm: realm,
          minigame: 'shape_match',
          choices: [
            {
              text: 'Unlock the Door & Enter the Portal 🔑',
              desc: 'Step into the 3D Infinity Portal!',
              nextNodeId: 'node_infinity_portal'
            },
            {
              text: 'Ask the Wise 3D Owl for a Clue 🦉',
              desc: 'Learn about the endless loop of happiness.',
              nextNodeId: 'node_owl'
            }
          ]
        },
        'node_sky': {
          id: 'node_sky',
          speaker: companionName,
          text: `Look! Golden 3D stars are falling through the sky! We must run and catch them!`,
          realm: realm,
          minigame: 'star_catcher',
          choices: [
            {
              text: 'Light up the 3D Rainbow Bridge 🌈',
              desc: 'Connect all the 3D animal and family worlds together!',
              nextNodeId: 'node_rainbow_bridge'
            }
          ]
        },
        'node_owl': {
          id: 'node_owl',
          speaker: 'Wise 3D Owl',
          text: `Hoo-hoo! Infinity is the endless story of love, family, and play that keeps growing forever!`,
          realm: realm,
          choices: [
            {
              text: 'Step across the 3D Rainbow Bridge 🎨',
              desc: 'Walk together with your family and animal friends.',
              nextNodeId: 'node_rainbow_bridge'
            }
          ]
        },
        'node_rainbow_bridge': {
          id: 'node_rainbow_bridge',
          speaker: heroName,
          text: `The 3D Rainbow Bridge is glowing! Look at all the 3D animals, family members, and shape friends dancing together!`,
          realm: realm,
          minigame: 'rainbow_painter',
          choices: [
            {
              text: 'Claim the 3D Infinity Certificate! 🎉',
              desc: 'Complete your quest and unlock the 3D Infinity Explorer badge!',
              nextNodeId: 'node_ending_infinity'
            }
          ]
        },
        'node_infinity_portal': {
          id: 'node_infinity_portal',
          speaker: companionName,
          text: `The 3D Infinity Gate opened! Sparkles of endless light are celebrating our journey!`,
          realm: realm,
          choices: [
            {
              text: 'Enter the Infinite Party! 🥳',
              desc: 'Celebrate with all your 3D friends!',
              nextNodeId: 'node_ending_infinity'
            }
          ]
        },
        'node_ending_infinity': {
          id: 'node_ending_infinity',
          speaker: heroName,
          text: `We found 3D Infinity! A world where animals, family, and shapes live in endless happiness forever!`,
          realm: realm,
          isEnding: true,
          choices: []
        }
      }
    };

    this.currentStory = tree;
    this.currentNodeId = 'start';
    this.storyHistory = ['start'];
    return tree;
  }

  getCurrentNode() {
    if (!this.currentStory) return null;
    return this.currentStory.nodes[this.currentNodeId];
  }

  makeChoice(choiceIndex) {
    const node = this.getCurrentNode();
    if (!node || !node.choices[choiceIndex]) return null;

    const nextId = node.choices[choiceIndex].nextNodeId;
    this.currentNodeId = nextId;
    this.storyHistory.push(nextId);

    const nextNode = this.getCurrentNode();
    if (nextNode && nextNode.isEnding) {
      this.saveStoryToLibrary({
        title: this.currentStory.title,
        hero: this.currentStory.hero,
        realm: this.currentStory.realm,
        ending: '3D Infinity Explorer'
      });
    }

    return nextNode;
  }
}
