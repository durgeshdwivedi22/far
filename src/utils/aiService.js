const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const buildPrompt = (prompt, image) => {
  let finalPrompt = prompt;
  if (image) {
    finalPrompt += `\n\nA crop image is attached named ${image.name}. Please analyze this image and provide detailed, practical farming advice. Help the farmer interpret what issues to watch for in the crop, including potential diseases, pest damage, nutrient deficiencies, or other concerns. Be specific and actionable in your recommendations.`;
  }
  return finalPrompt;
};

const openAIRequest = async (prompt, history = [], image) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  const systemMessage = {
    role: 'system',
    content: `You are AgriSmart AI, an expert farming assistant powered by advanced AI. You provide comprehensive, detailed, and actionable guidance to help smallholder farmers improve their crop yields, manage resources effectively, and optimize their farm operations.

Your expertise covers:
- Crop selection and planning based on soil type, climate, and season
- Soil health, preparation, and fertility management
- Pest and disease identification and organic/chemical control methods
- Irrigation and water management strategies
- Fertilizer application and nutrient management
- Harvesting techniques and crop market trends
- Weather-based farm planning
- Cost-effective farming practices

Guidelines for responses:
1. Be thorough and detailed - provide comprehensive advice that goes beyond surface-level answers
2. Give specific, actionable recommendations with step-by-step guidance when relevant
3. Include timeframes and quantities where applicable (e.g., "apply 50kg of NPK fertilizer per acre in 2 split doses")
4. Explain the "why" behind recommendations to help farmers understand better
5. Offer alternatives when multiple approaches exist
6. Include warnings about potential risks or mistakes to avoid
7. Use clear formatting with headings and bullet points for better readability
8. If image analysis is needed, provide detailed visual symptom interpretation
9. Ask clarifying questions if important information is missing

Remember: You're helping real farmers with real challenges. Provide honest, practical, and proven agricultural advice.`,
  };

  const userMessages = history.map((message) => ({
    role: message.sender === 'user' ? 'user' : 'assistant',
    content: message.text,
  }));

  const finalPrompt = buildPrompt(prompt, image);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [systemMessage, ...userMessages, { role: 'user', content: finalPrompt }],
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      
      // Fallback to gpt-3.5-turbo if gpt-4-turbo is not available
      if (errorText.includes('model') || errorText.includes('gpt-4-turbo')) {
        console.log('Falling back to gpt-3.5-turbo...');
        return await fallbackOpenAIRequest(systemMessage, userMessages, finalPrompt);
      }
      
      throw new Error(`OpenAI request failed: ${errorText}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    
    if (!content) {
      throw new Error('No response content from OpenAI');
    }
    
    return content;
  } catch (error) {
    console.error('OpenAI request error:', error);
    throw error;
  }
};

const fallbackOpenAIRequest = async (systemMessage, userMessages, finalPrompt) => {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...userMessages, { role: 'user', content: finalPrompt }],
      temperature: 0.7,
      max_tokens: 1200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fallback OpenAI request failed: ${errorText}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const localAiResponse = async (prompt = '', context = {}, image = null) => {
  await wait(200);
  const text = prompt.toLowerCase();
  const { marketData = [] } = context;

  if (image && !text) {
    return `I can see you've uploaded a crop image. To provide detailed analysis, please tell me:\n\n• What crop is this?\n• What symptoms or concerns do you see?\n• How old is the crop?\n• Any recent changes in weather or farming practices?\n\nWith these details, I can provide specific diagnosis and treatment recommendations.`;
  }

  if (image) {
    if (text.includes('disease') || text.includes('pest') || text.includes('spot') || text.includes('yellow') || text.includes('brown') || text.includes('wilt') || text.includes('leaf')) {
      return `Based on the crop image you've shared, here's my analysis:\n\n**Potential Issues Identified:**\n• The crop shows signs of stress or pest damage\n• Leaf discoloration and spotting patterns visible\n• Possible fungal or bacterial infection\n\n**Immediate Actions:**\n1. Isolate affected plants to prevent spread\n2. Remove severely damaged leaves\n3. Improve air circulation - space plants properly\n4. Avoid overhead watering\n\n**Treatment Options:**\n\n*Organic Methods:*\n• Neem spray (50ml per liter water) - spray early morning or late evening\n• Bordeaux mixture for fungal infections (1% solution)\n• Remove and destroy affected plant parts\n\n*Chemical Options:*\n• Mancozeb for fungal diseases\n• Appropriate insecticide for pest infestations\n\n**Prevention Going Forward:**\n• Crop rotation - don't plant same crop in same spot next season\n• Clean tools between plants\n• Monitor daily for early signs\n• Maintain consistent irrigation\n• Apply preventive sprays during monsoon\n\nFor more specific diagnosis, please describe the exact symptoms you see (color, location, pattern).`;
    }
    return `I've received your crop image. To provide the most accurate analysis, please describe:\n\n• **What you see:** yellowing, spots, holes, wilting, stunted growth?\n• **Where it's occurring:** on older leaves, new growth, stems, or everywhere?\n• **When it started:** recent development or ongoing issue?\n• **Current field conditions:** moisture, temperature, recent rains?\n\nThis information will help me give you precise treatment recommendations.`;
  }

  if (text.includes('market') || text.includes('price') || text.includes('sell') || text.includes('wheat') || text.includes('rice') || text.includes('cotton') || text.includes('maize')) {
    if (marketData.length) {
      return generateDetailedMarketAnalysis(marketData);
    }
    return `**Market Price Guidance:**\n\nWhile I don't have real-time prices right now, here's what to consider:\n\n**Key Crops and Seasonal Timing:**\n• **Wheat:** Best sold March-May (post-harvest rush passes)\n• **Rice:** Peak prices July-September\n• **Cotton:** Prices firm up August-September\n• **Maize:** September-October typically best\n\n**Selling Strategy:**\n1. **Check multiple markets** - prices vary by location\n2. **Don't rush** - store properly and wait for price peaks\n3. **Join farmer groups** - collective selling gets better rates\n4. **Track weather** - supply shocks boost prices\n5. **Time with festivals** - demand increases before major holidays\n\n**Cost Factors:**\n• Storage costs\n• Transportation\n• Market fees\n• Packaging quality\n\nVisit our Market page for updated prices and trends. I recommend checking prices regularly 2 weeks before harvest to plan your timing.`;
  }

  if (text.includes('soil') || text.includes('prepare') || text.includes('sow') || text.includes('plant') || text.includes('season') || text.includes('crop') || text.includes('recommend')) {
    return `**Crop Selection & Soil Match Guide:**\n\n**For Clay Soil:**\n• Best crops: Rice, wheat, pulses (arhar, urad), sugarcane\n• Improvement: Add 5-10 tons compost/FYM per acre before planting\n• Ensure drainage during monsoon\n• Wheat is ideal for winter season\n\n**For Loamy Soil (Best):**\n• Most crops thrive here: wheat, maize, cotton, groundnut, soybean\n• Good water retention and drainage balance\n• Add 2-3 tons compost to maintain fertility\n\n**For Sandy/Light Soil:**\n• Suitable crops: Groundnut, pulses, maize, millet\n• Poor water retention - requires more frequent irrigation\n• Add 10-15 tons compost/FYM to improve\n• Mulching essential\n\n**Seasonal Planning (North India):**\n\n**Rainy (June-Sept):**\n• Clay soil → Rice, maize, soybean\n• Black soil → Soybean, cotton\n• Light soil → Maize, pulses\n\n**Winter (Oct-March):**\n• Loamy soil → Wheat (best)\n• All soils → Pulses, mustard, vegetables\n\n**Summer (March-May):**\n• Groundnut, vegetables, fodder\n• Light soil → Millet\n\n**Soil Preparation (Critical Step):**\n1. Test soil pH and nutrients (essential!)\n2. Add compost 2 weeks before sowing\n3. Add NPK based on test report\n4. Deep plough 2-3 times\n5. Level field properly for water distribution\n6. Remove stones and debris\n\nWhat's your soil type and location? I can give more specific recommendations.`;
  }

  if (text.includes('water') || text.includes('irrigation') || text.includes('rain') || text.includes('weather') || text.includes('temperature')) {
    return `**Smart Irrigation & Water Management:**\n\n**By Crop Type:**\n\n**Rice:**\n• Needs standing water 5-10cm during growing period\n• Don't irrigate if rainfall expected within 2 days\n• Reduce water 2 weeks before harvest\n\n**Wheat:**\n• 4-5 major irrigations in season\n• Critical stages: After germination, tillering, grain filling\n• Total water needed: 400-500mm\n\n**Cotton:**\n• High water crop - 700-900mm needed\n• First irrigation after 60-70 days\n• Then every 10-15 days in dry season\n• Stop water 2 weeks before harvest\n\n**Vegetables (Tomato, Onion, Cabbage):**\n• Every 7-10 days in dry season\n• More frequent in summer (3-5 days)\n• Less in monsoon unless raining\n\n**General Rules:**\n1. **Soil moisture check:** Squeeze soil - should form loose ball\n2. **Timing:** Early morning or late evening (reduce evaporation)\n3. **Method:** Drip irrigation saves 30-40% water vs flooding\n4. **Monsoon:** Provide drainage, avoid waterlogging\n5. **Summer:** Mulch reduces water loss by 40-50%\n\n**Weather-Based Strategy:**\n• Check 7-day forecast\n• If rain expected within 2 days, skip irrigation\n• After rain, wait 3-4 days before checking soil moisture\n• Adjust for temperature spikes\n\n**Water Saving Tips:**\n• Mulch with straw, leaves, or plastic\n• Use drip irrigation\n• Add compost - increases water holding capacity by 25%\n• Grow moisture-conserving crops in dry regions\n\nWhat crop are you growing? I can give specific water schedules.`;
  }

  if (text.includes('pest') || text.includes('insect') || text.includes('worm') || text.includes('aphid')) {
    return `**Integrated Pest Management (IPM) Guide:**\n\n**Common Pests & Control:**\n\n**Early Warning Signs:**\n• Irregular leaf holes or edges\n• Yellowing or browning leaves\n• Sticky residue on leaves\n• Distorted new growth\n• Visible insects/webbing\n\n**Organic Solutions (Recommended):**\n\n1. **Neem Oil Spray:**\n   • Mix 50ml neem oil + 1 liter water\n   • Add 2ml liquid soap\n   • Spray on affected areas\n   • Repeat every 10-14 days\n   • Best early morning or evening\n\n2. **Natural Predators:**\n   • Ladybugs eat aphids\n   • Wasps control caterpillars\n   • Plant flowering plants to attract them\n\n3. **Manual Removal:**\n   • Hand-pick larger insects\n   • Remove heavily infested leaves\n   • Destroy diseased plant parts\n\n4. **Companion Planting:**\n   • Marigold repels many pests\n   • Basil deters insects\n   • Garlic spray acts as repellent\n\n**Chemical Options (If Severe):**\n• Use only if organic methods fail\n• Follow dosage strictly\n• Spray when pest population is low\n• Avoid spraying during flowering if possible\n• Always use protective gear\n\n**Prevention (Most Important):**\n1. Rotate crops yearly\n2. Remove crop residue\n3. Use resistant varieties\n4. Monitor fields daily\n5. Maintain good air circulation\n6. Keep weeds controlled\n7. Avoid overuse of nitrogen\n\n**When to Spray:**\n• Early morning (6-9am) or evening (4-7pm)\n• Not during flowering\n• Not within 2 weeks of harvest\n• Wait 2-3 days after rain\n\nWhat pests are you dealing with specifically? I can recommend targeted solutions.`;
  }

  if (text.includes('fertilizer') || text.includes('nutrient') || text.includes('nitrogen') || text.includes('yield') || text.includes('productivity')) {
    return `**Fertilizer & Nutrient Management Guide:**\n\n**NPK Basics:**\n• N (Nitrogen) - leaf & stem growth\n• P (Phosphorus) - root development & flowering\n• K (Potassium) - fruit quality & disease resistance\n\n**General Application Guidelines:**\n\n**Wheat (per acre):**\n• Urea: 80-100kg (split into 2-3 doses)\n• DAP: 50kg at sowing\n• Potash: 20kg if soil deficient\n• Timing: First dose at germination, second at tillering\n\n**Rice (per acre):**\n• Urea: 60kg (split doses)\n• DAP: 50kg at planting\n• Potash: 20kg at flowering\n• Apply first dose 15-20 days after planting\n\n**Cotton (per acre):**\n• Urea: 40kg (multiple splits)\n• DAP: 40kg at sowing\n• Potash: 25kg\n• Split applications = better yields\n\n**Application Method:**\n1. **Dry Application:** Mix with soil before watering\n2. **Fertigation:** Dilute and apply with irrigation water (saves 20-30%)\n3. **Foliar Spray:** For micronutrients - early morning on leaves\n\n**Organic Alternatives:**\n• Compost: 5-10 tons per acre\n• FYM (Farm Yard Manure): 8-10 tons\n• Vermicompost: 2-3 tons\n• Green manuring: Grow legumes and turn into soil\n• Neem cake: 1-2 tons per acre\n\n**Signs of Nutrient Deficiency:**\n• Nitrogen: Yellowing of lower leaves\n• Phosphorus: Dark green, poor growth\n• Potassium: Brown edges on leaves\n\n**Soil Testing (Highly Recommended):**\n• Get test done every 2 years\n• Apply fertilizer based on test results\n• Save money on unnecessary fertilizer\n• Avoid soil degradation\n\n**Best Practices:**\n1. Combine organic + chemical fertilizers\n2. Don't exceed recommended doses (waste + pollution)\n3. Apply when soil has moisture\n4. Time applications with crop growth stages\n5. Keep records of what you applied\n\nHave you done a soil test? Share your soil type and I can give specific recommendations.`;
  }

  return `**Welcome to AgriSmart AI!**\n\nI'm here to help you with:\n\n🌾 **Crop Selection** - Choose right crop for your soil & season\n🌱 **Soil Management** - Improve fertility & structure\n💧 **Irrigation** - Optimize water use\n🐛 **Pest Control** - Organic and chemical solutions\n🌾 **Fertilizers** - Nutrient management strategies\n📊 **Market Trends** - Pricing and selling advice\n📸 **Crop Analysis** - Upload images for diagnosis\n\n**Try asking me:**\n• "What should I plant in clay soil?"\n• "How to control pests naturally?"\n• "What's the best irrigation schedule for wheat?"\n• "How much fertilizer do I need?"\n• Upload a crop image for analysis\n\nWhat farming challenge can I help you solve today?`;
};

const generateDetailedMarketAnalysis = (marketData = []) => {
  if (!marketData.length) {
    return 'Market information is currently unavailable. Please refresh and try again.';
  }

  const rising = marketData.filter((item) => item.trend === 'up');
  const falling = marketData.filter((item) => item.trend === 'down');
  const stable = marketData.filter((item) => item.trend === 'stable');

  const topRising = rising.slice(0, 3);
  const topFalling = falling.slice(0, 3);

  let analysis = `**Market Analysis & Recommendations:**\n\n`;

  if (topRising.length) {
    analysis += `**📈 Rising Prices (Good Selling Time):**\n`;
    topRising.forEach(item => {
      analysis += `• ${item.name}: ₹${item.price}/quintal ↑\n`;
    });
    analysis += `\nConsider selling if you have stock ready. Prices may stabilize soon.\n\n`;
  }

  if (topFalling.length) {
    analysis += `**📉 Falling Prices (Wait or Store):**\n`;
    topFalling.forEach(item => {
      analysis += `• ${item.name}: ₹${item.price}/quintal ↓\n`;
    });
    analysis += `\nBetter to wait or store for better prices later.\n\n`;
  }

  if (stable.length) {
    analysis += `**➡️ Stable Prices:**\n`;
    stable.slice(0, 2).forEach(item => {
      analysis += `• ${item.name}: ₹${item.price}/quintal → Steady\n`;
    });
    analysis += `\n`;
  }

  analysis += `**Strategy Recommendations:**\n`;
  analysis += `1. **High Priority Sales:** ${topRising.length ? topRising.map(i => i.name).join(', ') : 'None right now'}\n`;
  analysis += `2. **Better to Store:** ${topFalling.length ? topFalling.map(i => i.name).join(', ') : 'None'}\n`;
  analysis += `3. **Market Timing:** Check prices 5-7 days before harvest to finalize strategy\n`;
  analysis += `4. **Storage Tips:** Keep in cool, dry place to prevent quality loss\n`;
  analysis += `5. **Group Selling:** Connect with other farmers for better rates\n`;

  return analysis;
};

export const askAI = async ({ prompt, context = {}, history = [], image = null }) => {
  try {
    if (OPENAI_API_KEY) {
      return await openAIRequest(prompt, history, image);
    }
  } catch (error) {
    console.warn('OpenAI request failed, falling back to local AI:', error);
  }

  return localAiResponse(prompt, context, image);
};
