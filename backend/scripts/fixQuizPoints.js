import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course } from '../src/models/Course.model.js';

dotenv.config();

const fixQuizPoints = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all courses
    const courses = await Course.find({});
    console.log(`📚 Found ${courses.length} courses`);

    let totalQuizzesUpdated = 0;

    for (const course of courses) {
      let courseModified = false;

      for (const chapter of course.chapters) {
        for (const quiz of chapter.quizzes) {
          const questionsCount = (quiz.questions || []).length;
          const correctPoints = questionsCount * 20;

          // Only update if points don't match
          if (quiz.points !== correctPoints) {
            console.log(`\n🔧 Fixing quiz "${quiz.title}"`);
            console.log(`   Questions: ${questionsCount}`);
            console.log(`   Old points: ${quiz.points}`);
            console.log(`   New points: ${correctPoints}`);

            quiz.points = correctPoints;
            courseModified = true;
            totalQuizzesUpdated++;
          }
        }
      }

      if (courseModified) {
        await course.save();
        console.log(`✅ Updated course: ${course.title}`);
      }
    }

    console.log(`\n✅ Migration complete! Updated ${totalQuizzesUpdated} quizzes.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixQuizPoints();
